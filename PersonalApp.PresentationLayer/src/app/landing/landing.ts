import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing implements OnInit {

  todayDate: Date = new Date();
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          if (user && user.userId) {
            this.isLoggedIn = true;
            this.userName = user.name || 'User';
          }
        } catch (e) {
          this.isLoggedIn = false;
        }
      }
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

