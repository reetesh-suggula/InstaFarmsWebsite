declare global {
    interface Window {
      recaptchaVerifier: firebase.auth.RecaptchaVerifier;
      otpless:any;
      Razorpay: any;
    }
  }

  
  export {};