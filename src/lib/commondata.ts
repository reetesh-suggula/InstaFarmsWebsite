import axios from 'axios';

export class CommonData {
  async locations() {
    try {
      const data = await axios.get(`${process.env.API_URL}/locations/data`);
      return data;
    }catch(err){
      throw err;
    }
  }
}