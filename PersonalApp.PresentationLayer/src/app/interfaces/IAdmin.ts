export interface IAdminAnalytics {
  totalUsers: number;
  totalJobs: number;
  totalSavingsAmount: number;
  totalLearningLogs: number;
  totalTasks: number;
  totalSubjects: number;
}

export interface IAdminUserDetail {
  userId: number;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  isAdmin: boolean;
  jobsCount: number;
  totalSavings: number;
  learningLogsCount: number;
  tasksCount: number;
  completedTasksCount: number;
}

