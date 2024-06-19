import axios from "axios";

export class User {
    
    async register(data: any) {
        try {
        const response = await axios.post(`${process.env.API_URL}/user/signIn`, data);
        return response;
        } catch (err) {
        throw err;
        }
    }
    
    async updateUser(data: any) {
        try {
        const response = await axios.put(`${process.env.API_URL}/users/updateuser`, data);
        return response;
        } catch (err) {
        throw err;
        }
    }
}

