import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard-service';
import { IUser } from '../interfaces/IUser';
import { IJobs } from '../interfaces/IJobs';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
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


  applications: number = 0;
  totalJobs: number = 0;
  interviews: number = 0;
  pendingTasks: number = 0;



  constructor(private ds: DashboardService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {

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
    //get all jobs
    this.ds.getAllJobs(this.userId).subscribe((jobs) => {
      console.log("All jobs", jobs);
      this.totalJobs = jobs.length;
      console.log("Total jobs", this.totalJobs);
      this.cdr.detectChanges();
    })

    //get all tasks
    this.ds.getAllTasks(this.userId).subscribe((tasks) => {
      console.log("All tasks", tasks);
      this.pendingTasks = tasks.filter(
        task => task.status === 'Pending').length;
      console.log("Coutn of pending tasks", this.pendingTasks);
      this.cdr.detectChanges();
    })



  }

}
