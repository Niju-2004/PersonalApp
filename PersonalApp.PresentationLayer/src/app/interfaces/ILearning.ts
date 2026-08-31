export interface ILearningItem {
  learningItemId?: number;
  userId: number;
  name: string;
  category?: string | null;
  progress?: number;
  startDate?: string | null;
  targetDate?: string | null;
  status?: string;
  totalDaysLogged?: number;
  currentStreak?: number;
}

export interface ILearningLog {
  logId?: number;
  learningItemId: number;
  userId: number;
  learnedDate: string; // YYYY-MM-DD
  topicCovered: string;
  notes?: string | null;
  createdAt?: string;
}

export interface ICalendarDay {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isTicked: boolean;
  log?: ILearningLog;
}

