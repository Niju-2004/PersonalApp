import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('PersonalApp.PresentationLayer');
}
