import axios from 'axios';

export class Auth {
  async signIn(phoneNumber: any) {
    try {
      const data = await axios.post(`${process.env.API_URL}/user/signIn`, {phoneNumber:phoneNumber});
      return data;
    }catch(err){
      throw err;
    }
  }
}