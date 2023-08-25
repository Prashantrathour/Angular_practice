import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SigninService {

  
  constructor(private cookies: CookieService) {}

  isLoggedIn(): boolean {
    return this.cookies.get('token') !== '';
  }

  logout(): void {
    this.cookies.delete('token');
  }
 
}

