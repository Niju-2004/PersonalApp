import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';
import { ThemeService } from '../services/theme-service';

@Component({
  imports: [FormsModule, RouterLink, CommonModule],
  selector: 'app-user-registration',
  styleUrl: './user-registration.css',
  templateUrl: './user-registration.html',
})
export class UserRegistration {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 4) {
      this.errorMessage = 'Password must be at least 4 characters long.';
      return;
    }

    this.isLoading = true;

    this.userService.userRegistration(this.name, this.email, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res === -1) {
          this.errorMessage = '⚠️ Email already registered! Please sign in or use another email.';
          return;
        }

        if (res > 0) {
          this.successMessage = '🎉 Account created successfully! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1800);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration error:', err);
        this.errorMessage = '⚠️ Email already registered! Please sign in or use another email.';
      }
    });
  }
}

