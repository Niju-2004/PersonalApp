import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';

@Component({
  imports: [Loginpage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('PersonalApp.PresentationLayer');
}
