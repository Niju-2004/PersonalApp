import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { ThemeService } from '../services/theme-service';

@Component({
  imports: [FormsModule, RouterLink, CommonModule],
  selector: 'app-loginpage',
  styleUrl: './loginpage.css',
  templateUrl: './loginpage.html',
})
export class Loginpage implements OnInit {

  email: string = '';
  password: string = '';

  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private route: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit() { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = '⚠️ Please enter both Email and Password.';
      return;
    }

    this.isLoading = true;

    this.userService.verifyUser(this.email, this.password).subscribe({
      next: (r) => {
        this.isLoading = false;
        if (r === 1) {
          this.userService.userInformation(this.email, this.password).subscribe({
            next: (user: IUser) => {
              if (typeof window !== 'undefined' && window.sessionStorage) {
                sessionStorage.setItem('user', JSON.stringify(user));
              }
              this.route.navigate(['/layout/dashboard']);
            },
            error: (err) => {
              console.error('Failed to load user info:', err);
              this.errorMessage = '⚠️ Error loading user profile. Please try again.';
            }
          });
        } else {
          this.errorMessage = '⚠️ Invalid email or password. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        this.errorMessage = '⚠️ Invalid email or password. Please try again.';
      }
    });
  }
}

