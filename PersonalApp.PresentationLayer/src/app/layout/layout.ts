import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task-service';
import { ITask } from '../interfaces/ITask';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout implements OnInit {

  todayDate: Date = new Date();
  userId: number = 0;

  // Global Floating Checklist State
  isChecklistOpen: boolean = false;
  dailyTasks: ITask[] = [];
  newDailyTaskTitle: string = '';
  newDailyTaskPriority: string = 'Medium';
  completedTasksCount: number = 0;
  totalTasksCount: number = 0;
  progressPercentage: number = 0;
  isLoadingTasks: boolean = false;

  constructor(
    private route: Router,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userId = user.userId;
      this.loadDailyTasks();
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.route.navigate(['/login']);
  }

  // ==========================================
  // GLOBAL FLOATING CHECKLIST METHODS
  // ==========================================

  toggleChecklist(): void {
    this.isChecklistOpen = !this.isChecklistOpen;
    if (this.isChecklistOpen) {
      this.loadDailyTasks();
    }
  }

  closeChecklist(): void {
    this.isChecklistOpen = false;
  }

  loadDailyTasks(): void {
    if (!this.userId) return;

    this.isLoadingTasks = true;
    this.taskService.getAllTasks(this.userId).subscribe({
      next: (tasks: ITask[]) => {
        this.dailyTasks = tasks || [];
        this.calculateTaskMetrics();
        this.isLoadingTasks = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching daily tasks:', err);
        this.isLoadingTasks = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateTaskMetrics(): void {
    this.totalTasksCount = this.dailyTasks.length;
    this.completedTasksCount = this.dailyTasks.filter(t => t.status === 'Completed').length;
    if (this.totalTasksCount > 0) {
      this.progressPercentage = Math.round((this.completedTasksCount / this.totalTasksCount) * 100);
    } else {
      this.progressPercentage = 0;
    }
  }

  quickAddMorningTask(): void {
    if (!this.newDailyTaskTitle.trim() || !this.userId) return;

    const payload: ITask = {
      userId: this.userId,
      title: this.newDailyTaskTitle.trim(),
      priority: this.newDailyTaskPriority,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    this.taskService.addTask(payload).subscribe({
      next: () => {
        this.newDailyTaskTitle = '';
        this.loadDailyTasks();
      },
      error: (err) => console.error('Error adding task:', err)
    });
  }

  toggleTaskCheck(task: ITask, event: Event): void {
    event.stopPropagation();
    if (!task.taskId) return;

    // Optimistic toggle in UI
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    this.calculateTaskMetrics();

    this.taskService.toggleTaskStatus(task.taskId).subscribe({
      next: () => {
        this.loadDailyTasks();
      },
      error: (err) => {
        console.error('Error toggling task:', err);
        this.loadDailyTasks(); // Rollback on error
      }
    });
  }

  deleteDailyTask(taskId?: number, event?: Event): void {
    if (event) event.stopPropagation();
    if (!taskId) return;

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadDailyTasks();
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}

