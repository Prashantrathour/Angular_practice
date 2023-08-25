import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  async getdishes(query:string='a'): Promise<any> {
    try {
      const res=await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f='+query)
      return res.data
      
    } catch (error) {
      console.log(error)
    }

  }
}
