import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private cookies: CookieService, private router: Router, private homeService: HomeService) { }
  data: any[] = [];
  alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  selectedLetter: any = 'a';
  showMore: boolean = false; // Initialize showMore as false
loading: boolean = false;
  

  toggleDescription() {
    this.showMore = !this.showMore; // Toggle showMore between true and false
  }
  selectLetter(letter: any) {
    this.selectedLetter = letter;
    this.loadData(); // Call the function to load data when a letter is selected
  }

  async ngOnInit() {
    const auth_token = this.cookies.get('token');
    if (!auth_token) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Initial load of data when the component initializes
    this.loadData();
    console.log(this.data,true);
  }

  async loadData() {
    this.loading=true
    try {
      const res = await this.homeService.getdishes(this.selectedLetter);
      this.data = res.meals;
      console.log(this.data);
      this.loading=false
    } catch (error) {
      console.error('Error fetching data:', error);
      this.loading=false
    }
  }
}
