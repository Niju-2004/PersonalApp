import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin-service';
import { IAdminAnalytics, IAdminUserDetail } from '../interfaces/IAdmin';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit {

  currentUser: any = null;
  isAdmin: boolean = false;

  // Analytics
  analytics: IAdminAnalytics = {
    totalUsers: 0,
    totalJobs: 0,
    totalSavingsAmount: 0,
    totalLearningLogs: 0,
    totalTasks: 0,
    totalSubjects: 0
  };

  // User Directory
  users: IAdminUserDetail[] = [];
  filteredUsers: IAdminUserDetail[] = [];
  searchQuery: string = '';

  // Selected User for Activity Inspector Modal
  selectedUser: IAdminUserDetail | null = null;
  isUserModalOpen: boolean = false;

  isLoading: boolean = false;
  statusMessage: string = '';
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userJson = sessionStorage.getItem('user');
      if (userJson) {
        this.currentUser = JSON.parse(userJson);
        this.isAdmin = this.currentUser.email === 'admin';
      }
    }

    // Protect Admin Page: Only 'admin' account can view
    if (!this.isAdmin) {
      this.router.navigate(['/layout/dashboard']);
      return;
    }

    this.loadAdminData();
  }

  loadAdminData(): void {
    this.isLoading = true;

    // 1. Fetch Analytics
    this.adminService.getAnalytics().subscribe({
      next: (analytics) => {
        this.analytics = analytics;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching admin analytics:', err)
    });

    // 2. Fetch All Users Detailed
    this.adminService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users || [];
        this.filterUsers();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching admin users:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filterUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const q = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }
  }

  inspectUser(user: IAdminUserDetail): void {
    this.selectedUser = user;
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
    this.selectedUser = null;
  }

  deleteUser(user: IAdminUserDetail, event: Event): void {
    event.stopPropagation();

    if (user.isAdmin || user.email === 'admin') {
      alert('Master Admin account cannot be deleted.');
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete user "${user.name}" (${user.email}) and all their associated data?`)) {
      return;
    }

    this.isLoading = true;
    this.adminService.deleteUser(user.userId).subscribe({
      next: () => {
        this.statusMessage = `User ${user.name} was successfully deleted.`;
        setTimeout(() => this.statusMessage = '', 4000);
        this.loadAdminData();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.errorMessage = 'Failed to delete user. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getUserInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}

