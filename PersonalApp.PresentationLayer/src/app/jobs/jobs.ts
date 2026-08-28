import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';
import { IUser } from '../interfaces/IUser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../services/job-service';
import { FormsModule } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink, FormsModule],
  selector: 'app-jobs',
  styleUrl: './jobs.css',
  templateUrl: './jobs.html',
})
export class Jobs implements OnInit {
  jobs: any[] = [];
 
  user: IUser | null = null;

  name: string = '';
  userId: number = 0;
  email: string = '';
  password: string = '';
  createdAt: string = '';

  selectedJob: any = null;
  isViewModalOpen: boolean = false;

  isDrawerOpen: boolean = false;
  newJob = {
    companyName: '',
    jobTitle: '',
    jobUrl: '',
    appliedDate: new Date().toISOString().substring(0, 10), // Defaults to today: YYYY-MM-DD
    status: 'Applied',
    salary: 0,
    interviewDate: '',
    notes: ''
  };

  constructor(private ds: DashboardService,
              private js: JobService,
              private cdr: ChangeDetectorRef,
              private route: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {

      this.user = JSON.parse(storedUser);

      // Store individual values
      this.name = this.user!.name;
      this.userId = this.user!.userId;
      this.email = this.user!.email;
      this.createdAt = this.user!.createdAt;


      console.log('Logged in user:', this.user);
      console.log('User ID:', this.userId);
      console.log('User name:', this.name);

      // Get dashboard counts from backend
      // this.getDashboardCounts();

    } else {

      console.log('No user found in localStorage');

    }

    this.loadJobs();

  }
  loadJobs() {
    this.ds.getAllJobs(this.userId).subscribe((jobs) => {
      this.jobs = jobs;
      console.log("Total jobs", this.jobs);
      this.cdr.detectChanges();
    })
  }

  openDrawer() {
    this.resetForm();
    this.isDrawerOpen = true;
  }
  closeDrawer() {
    this.isDrawerOpen = false;
  }
  resetForm() {
    this.newJob = {
      companyName: '',
      jobTitle: '',
      jobUrl: '',
      appliedDate: new Date().toISOString().substring(0, 10),
      status: 'Applied',
      salary: 0,
      interviewDate: '',
      notes: ''
    };
  }

  submitJob() {
    this.js.addJobs(
      0,
      this.userId,
      this.newJob.companyName,
      this.newJob.jobTitle,
      this.newJob.jobUrl,
      this.newJob.appliedDate,
      this.newJob.status,
      this.newJob.salary,
      this.newJob.interviewDate,
      this.newJob.notes
    ).subscribe((newJobId) => {
      console.log("Job created with ID:", newJobId);
      this.closeDrawer();
      this.loadJobs();
    });

    this.route.navigate(['/layout/jobs']);
  }
  openViewJob(job: any) {
    this.selectedJob = job;
    this.isViewModalOpen = true;
  }
  closeViewJob() {
    this.selectedJob = null;
    this.isViewModalOpen = false;
  }
}
