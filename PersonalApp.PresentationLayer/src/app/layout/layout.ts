import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {

  constructor(private route: Router) { }

  logout() {
    localStorage.removeItem("user");
    this.route.navigate(['/login']);
  }
}
