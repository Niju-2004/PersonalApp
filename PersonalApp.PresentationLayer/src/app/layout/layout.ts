import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {

  todayDate: Date = new Date();

  constructor(private route: Router) { }

  logout() {
    localStorage.removeItem("user");
    this.route.navigate(['/login']);
  }
}

