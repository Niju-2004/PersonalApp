export interface ITask {
  taskId?: number;
  userId: number;
  title: string;
  description?: string | null;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  createdAt?: string;
  completedAt?: string | null;
}

