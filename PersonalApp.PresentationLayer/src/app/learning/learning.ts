import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningService } from '../services/learning-service';
import { ILearningItem, ILearningLog, ICalendarDay } from '../interfaces/ILearning';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-learning',
  styleUrl: './learning.css',
  templateUrl: './learning.html',
})
export class Learning implements OnInit {

  userId: number = 0;
  subjects: ILearningItem[] = [];
  allLogs: ILearningLog[] = [];

  // Selected Subject for Calendar View
  selectedSubject: ILearningItem | null = null;
  subjectLogs: ILearningLog[] = [];

  // Calendar State
  viewDate: Date = new Date();
  calendarDays: ICalendarDay[] = [];
  monthYearTitle: string = '';
  currentStreak: number = 0;
  totalDaysLogged: number = 0;

  // Modals
  isAddSubjectOpen: boolean = false;
  isCheckinModalOpen: boolean = false;
  selectedDay: ICalendarDay | null = null;

  // Form Fields
  newSubjectName: string = '';
  newSubjectCategory: string = 'Programming';
  formTopicCovered: string = '';
  formNotes: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    private learningService: LearningService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userId = user.userId;
    }
    this.loadSubjects();
  }

  loadSubjects(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.learningService.getAllSubjects(this.userId).subscribe({
      next: (subjects: ILearningItem[]) => {
        this.subjects = subjects || [];
        
        // Also fetch all logs for user to compute global stats
        this.learningService.getAllLogsForUser(this.userId).subscribe({
          next: (logs: ILearningLog[]) => {
            this.allLogs = logs || [];
            this.calculateSubjectStats();
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error fetching all logs:', err);
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Error fetching subjects:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateSubjectStats(): void {
    for (const sub of this.subjects) {
      const logs = this.allLogs.filter(l => l.learningItemId === sub.learningItemId);
      sub.totalDaysLogged = logs.length;
      sub.currentStreak = this.computeStreakForLogs(logs);
    }
  }

  // ==========================================
  // LEVEL 2: INTERACTIVE CALENDAR LOGIC
  // ==========================================

  openSubjectCalendar(subject: ILearningItem): void {
    this.selectedSubject = subject;
    this.viewDate = new Date();
    this.loadSubjectLogs(subject.learningItemId!);
  }

  closeCalendar(): void {
    this.selectedSubject = null;
    this.subjectLogs = [];
    this.calendarDays = [];
    this.loadSubjects(); // Refresh stats
  }

  loadSubjectLogs(learningItemId: number): void {
    this.isLoading = true;
    this.learningService.getLogsBySubject(learningItemId).subscribe({
      next: (logs: ILearningLog[]) => {
        this.subjectLogs = logs || [];
        this.totalDaysLogged = this.subjectLogs.length;
        this.currentStreak = this.computeStreakForLogs(this.subjectLogs);
        this.generateCalendarGrid();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading subject logs:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.generateCalendarGrid();
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.generateCalendarGrid();
  }

  goToToday(): void {
    this.viewDate = new Date();
    this.generateCalendarGrid();
  }

  generateCalendarGrid(): void {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    this.monthYearTitle = this.viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const todayStr = this.formatDateString(new Date());

    const grid: ICalendarDay[] = [];

    // 1. Trailing days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      const dateStr = this.formatDateString(d);
      const log = this.findLogForDate(dateStr);
      grid.push({
        date: d,
        dateString: dateStr,
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isTicked: !!log,
        log
      });
    }

    // 2. Days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const dateStr = this.formatDateString(d);
      const log = this.findLogForDate(dateStr);
      grid.push({
        date: d,
        dateString: dateStr,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isTicked: !!log,
        log
      });
    }

    // 3. Leading days from next month to complete the 35 or 42 grid
    const remaining = (7 - (grid.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      const dateStr = this.formatDateString(d);
      const log = this.findLogForDate(dateStr);
      grid.push({
        date: d,
        dateString: dateStr,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isTicked: !!log,
        log
      });
    }

    this.calendarDays = grid;
  }

  findLogForDate(dateStr: string): ILearningLog | undefined {
    return this.subjectLogs.find(l => {
      const logDate = this.formatDateString(new Date(l.learnedDate));
      return logDate === dateStr;
    });
  }

  formatDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  computeStreakForLogs(logs: ILearningLog[]): number {
    if (!logs || logs.length === 0) return 0;

    const dates = Array.from(new Set(logs.map(l => this.formatDateString(new Date(l.learnedDate))))).sort().reverse();
    const todayStr = this.formatDateString(new Date());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.formatDateString(yesterday);

    if (dates[0] !== todayStr && dates[0] !== yesterdayStr) {
      return 0; // Streak broken if not studied today or yesterday
    }

    let streak = 0;
    let curr = new Date(dates[0]);

    for (const dStr of dates) {
      const expectedStr = this.formatDateString(curr);
      if (dStr === expectedStr) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  // ==========================================
  // DATE CLICK & CHECK-IN / TICKING MODAL
  // ==========================================

  onDateClick(day: ICalendarDay): void {
    this.selectedDay = day;
    this.errorMessage = '';

    if (day.log) {
      // Pre-fill existing note
      this.formTopicCovered = day.log.topicCovered || '';
      this.formNotes = day.log.notes || '';
    } else {
      this.formTopicCovered = '';
      this.formNotes = '';
    }

    this.isCheckinModalOpen = true;
  }

  closeCheckinModal(): void {
    this.isCheckinModalOpen = false;
    this.selectedDay = null;
  }

  saveDateCheckin(): void {
    if (!this.selectedSubject || !this.selectedDay) return;

    if (!this.formTopicCovered.trim()) {
      this.errorMessage = 'Please describe what you learned on this date (e.g. OOPs concepts).';
      return;
    }

    const payload: ILearningLog = {
      learningItemId: this.selectedSubject.learningItemId!,
      userId: this.userId,
      learnedDate: this.selectedDay.dateString,
      topicCovered: this.formTopicCovered.trim(),
      notes: this.formNotes ? this.formNotes.trim() : null
    };

    this.isLoading = true;
    this.learningService.saveOrUpdateLog(payload).subscribe({
      next: () => {
        this.closeCheckinModal();
        this.loadSubjectLogs(this.selectedSubject!.learningItemId!);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error saving learning log:', err);
        this.errorMessage = 'Failed to save. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  untickDate(): void {
    if (!this.selectedSubject || !this.selectedDay) return;

    this.isLoading = true;
    this.learningService.untickDate(this.selectedSubject.learningItemId!, this.selectedDay.dateString).subscribe({
      next: () => {
        this.closeCheckinModal();
        this.loadSubjectLogs(this.selectedSubject!.learningItemId!);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error unticking date:', err);
        this.cdr.detectChanges();
      }
    });
  }

  deleteLogFromHistory(logId?: number): void {
    if (!logId) return;
    if (!confirm('Are you sure you want to delete this study record?')) return;

    this.learningService.deleteLog(logId).subscribe({
      next: () => {
        if (this.selectedSubject) {
          this.loadSubjectLogs(this.selectedSubject.learningItemId!);
        }
      },
      error: (err) => console.error('Error deleting log:', err)
    });
  }

  // ==========================================
  // SUBJECT CREATION & MANAGEMENT
  // ==========================================

  openAddSubject(): void {
    this.newSubjectName = '';
    this.newSubjectCategory = 'Programming';
    this.errorMessage = '';
    this.isAddSubjectOpen = true;
  }

  closeAddSubject(): void {
    this.isAddSubjectOpen = false;
  }

  saveNewSubject(): void {
    if (!this.newSubjectName.trim()) {
      this.errorMessage = 'Please enter a Subject / Skill name.';
      return;
    }

    const payload: ILearningItem = {
      userId: this.userId,
      name: this.newSubjectName.trim(),
      category: this.newSubjectCategory.trim(),
      status: 'In Progress',
      progress: 0,
      startDate: new Date().toISOString()
    };

    this.isLoading = true;
    this.learningService.addSubject(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeAddSubject();
        this.loadSubjects();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding subject:', err);
        this.errorMessage = 'Failed to create subject. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  deleteSubject(sub: ILearningItem, event: Event): void {
    event.stopPropagation();
    if (!sub.learningItemId) return;
    if (!confirm(`Are you sure you want to delete "${sub.name}" and all its study records?`)) return;

    this.learningService.deleteSubject(sub.learningItemId).subscribe({
      next: () => {
        this.loadSubjects();
      },
      error: (err) => console.error('Error deleting subject:', err)
    });
  }

  getSubjectIcon(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('c#') || n.includes('c sharp') || n.includes('.net')) return '📘';
    if (n.includes('angular') || n.includes('react') || n.includes('vue') || n.includes('frontend')) return '🅰️';
    if (n.includes('docker') || n.includes('kubernetes') || n.includes('cloud') || n.includes('aws')) return '🐳';
    if (n.includes('sql') || n.includes('postgres') || n.includes('database')) return '🐬';
    if (n.includes('python')) return '🐍';
    if (n.includes('dsa') || n.includes('leetcode') || n.includes('algorithm')) return '🧩';
    if (n.includes('system design')) return '🏗️';
    return '📚';
  }
}

