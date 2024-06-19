
import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from './firebase/firebase';
import { useRouter } from "next/navigation";

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);;
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  useEffect(() => {
    configureCaptcha();
  });

  async function configureCaptcha() {
    if (auth && !window.recaptchaVerifier) {
      window.recaptchaVerifier = await new RecaptchaVerifier(auth,
        'recaptcha',
        {
          size: 'invisible',
          callback: (response: any) => { },
          defaultCountry: 'IN'
        }
      );
    }
  }

  const handlePhoneNumberChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOtp(e.target.value);
  }

  const handleSendOtp = async () => {
    try {
      console.log("server");
      const appVerifier = window.recaptchaVerifier;
      const formattedPhoneNumber = `+91${phoneNumber.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber('');
      alert('Otp has been sent');

    } catch (e) {
      console.error("Error while sending otp" + e);
    }
  }

  const handleOtpSubmit = async () => {
    try {
      let result = await confirmationResult?.confirm(otp);
      console.log(result);
      setOtp('');
      router.push('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div>{!otpSent ? (<div id="recaptcha"></div>) : null}</div>
      <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange}
        placeholder="Enter Phone Number" />
      <input type="text" value={otp} onChange={handleOtpChange} placeholder="Enter Otp" />
      {/* set button color based on otp sent */}
      <button style={{ backgroundColor: otpSent ? 'green' : 'blue' }} onClick={otpSent ? handleOtpSubmit : handleSendOtp}>
        {otpSent ? 'Submit OTP' : 'Send OTP'}
      </button>
    </>
  );
}
