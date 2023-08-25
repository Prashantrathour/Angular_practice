import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginservice:LoginService,private router:Router,private cookieService: CookieService){}
  email:string=""
  password:string=""
error:boolean=false
loading:boolean=false
message:string=''
  async onSubmit(){

try {
  this.loading=true
  const res=await this.loginservice.login({email:this.email,password:this.password})
  console.log(res)
  this.cookieService.set('token',res.token)
  this.router.navigate([''])
  this.loading=false
} catch (err:any) {
 
  this.loading=false
  this.error=true
  this.message=err.response.data.msg
  console.log(err.response.data.msg,this.error)
}

    console.log(this.email,this.password)
  }
}
