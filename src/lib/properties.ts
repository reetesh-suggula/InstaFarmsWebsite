import axios from 'axios';

export class Properties {
  async getProperties() {
    try {
      const data = await axios.get(`${process.env.API_URL}/hotelsinfo/getproperties`);
      return data;
    }catch(err){
      throw err;
    }
  }

  async getPropertiesByFilters(filters:any) {
    try {
      const data = await axios.get(`${process.env.API_URL}/properties/propertiesByFilters`, {params: filters});
      return data;
    }catch(err){
      throw err;
    }
  }
}