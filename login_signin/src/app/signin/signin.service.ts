import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor() { }

  private apiUrl = 'https://determined-red-worm.cyclic.app/users';

  async signIn(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, data);
      return response.data;
    } catch (error) {
     
      throw error;
    }
  }
}
