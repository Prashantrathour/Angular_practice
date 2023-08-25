import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private apiUrl='https://determined-red-worm.cyclic.app/users'


  async login(data:any):Promise<any>{
    try{
      const response=await axios.post(`${this.apiUrl}/login`,data)
      return response.data
    }catch(error){
      throw error
    }
  }
}
