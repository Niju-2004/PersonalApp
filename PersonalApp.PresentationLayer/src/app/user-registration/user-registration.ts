import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';

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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    // Simple validation
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
      next: (userId) => {
        this.isLoading = false;
        console.log('User registered with ID:', userId);
        this.successMessage = 'Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration failed:', err);
        this.errorMessage = 'Registration failed. Email might already be in use.';
      }
    });
  }
}

