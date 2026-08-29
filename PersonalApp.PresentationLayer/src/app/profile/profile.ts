import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard-service';
import { SavingsService } from '../services/savings-service';
import { IUser } from '../interfaces/IUser';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit {

  user: IUser | null = null;
  userId: number = 0;
  name: string = '';
  email: string = '';
  createdAt: string = '';
  initials: string = 'U';

  totalJobsCount: number = 0;
  totalSavingsAmount: number = 0;
  totalSavingsBuckets: number = 0;
  pendingTasksCount: number = 0;

  isLoading: boolean = false;

  constructor(
    private ds: DashboardService,
    private savingsService: SavingsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
      this.userId = this.user!.userId;
      this.name = this.user!.name || 'User';
      this.email = this.user!.email || '';
      this.createdAt = this.user!.createdAt || new Date().toISOString();
      this.generateInitials();
      this.loadUserStats();
    }
  }

  generateInitials(): void {
    if (!this.name) {
      this.initials = 'U';
      return;
    }
    const parts = this.name.trim().split(' ');
    if (parts.length >= 2) {
      this.initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else {
      this.initials = parts[0].substring(0, Math.min(2, parts[0].length)).toUpperCase();
    }
  }

  loadUserStats(): void {
    if (!this.userId) return;

    this.isLoading = true;

    // 1. Fetch total jobs
    this.ds.getAllJobs(this.userId).subscribe({
      next: (jobs) => {
        this.totalJobsCount = jobs ? jobs.length : 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching jobs count for profile:', err)
    });

    // 2. Fetch total savings
    this.savingsService.getAllSavings(this.userId).subscribe({
      next: (savings) => {
        if (savings && savings.length > 0) {
          this.totalSavingsAmount = savings.reduce((acc, curr) => acc + Number(curr.amount), 0);
          const distinctBuckets = new Set(savings.map(s => `${s.bankName.toLowerCase()}___${s.reason.toLowerCase()}`));
          this.totalSavingsBuckets = distinctBuckets.size;
        } else {
          this.totalSavingsAmount = 0;
          this.totalSavingsBuckets = 0;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching savings for profile:', err)
    });

    // 3. Fetch pending tasks
    this.ds.getAllTasks(this.userId).subscribe({
      next: (tasks) => {
        if (tasks) {
          this.pendingTasksCount = tasks.filter(t => t.status === 'Pending').length;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching tasks for profile:', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

