import { Component } from '@angular/core';
import { SigninService } from './signin.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private SigninService: SigninService,private router:Router) {}
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  async onSubmit() {
    const res=await this.SigninService.signIn(this.user)
    console.log('userdata:', this.user,res);
    alert("user registered successfully")
    this.router.navigate(['/login'])
   
  }
}
