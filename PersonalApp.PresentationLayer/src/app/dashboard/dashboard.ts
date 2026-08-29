import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';
import { SavingsService } from '../services/savings-service';
import { IUser } from '../interfaces/IUser';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  user: IUser | null = null;

  name: string = '';
  userId: number = 0;
  email: string = '';
  password: string = '';
  createdAt: string = '';

  totalJobs: number = 0;
  totalSavings: number = 0;
  savingsBuckets: number = 0;
  pendingTasks: number = 0;

  constructor(
    private ds: DashboardService,
    private savingsService: SavingsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.name = this.user!.name;
      this.userId = this.user!.userId;
      this.email = this.user!.email;
      this.createdAt = this.user!.createdAt;
    }

    if (!this.userId) return;

    // Get all jobs
    this.ds.getAllJobs(this.userId).subscribe({
      next: (jobs) => {
        this.totalJobs = jobs ? jobs.length : 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading jobs:', err)
    });

    // Get all savings
    this.savingsService.getAllSavings(this.userId).subscribe({
      next: (savings) => {
        if (savings && savings.length > 0) {
          this.totalSavings = savings.reduce((acc, curr) => acc + Number(curr.amount), 0);
          const distinctBuckets = new Set(savings.map(s => `${s.bankName.toLowerCase()}___${s.reason.toLowerCase()}`));
          this.savingsBuckets = distinctBuckets.size;
        } else {
          this.totalSavings = 0;
          this.savingsBuckets = 0;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading savings:', err)
    });

    // Get all tasks
    this.ds.getAllTasks(this.userId).subscribe({
      next: (tasks) => {
        if (tasks) {
          this.pendingTasks = tasks.filter(task => task.status === 'Pending').length;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }
}

