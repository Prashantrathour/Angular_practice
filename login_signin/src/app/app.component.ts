import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: SigninService,private router:Router,private cdr: ChangeDetectorRef) {}

  title = 'login_signin';
login:boolean=false
  ngOnInit(): void {
  
    this.login = this.authService.isLoggedIn();
    this.cdr.detectChanges()
    console.log(this.cdr)
    
  }

  logout() {
 
    this.authService.logout();
    this.login = false;
    this.router.navigate(['/login']);
  }
}
