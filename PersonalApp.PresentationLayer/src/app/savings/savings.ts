import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavingsService } from '../services/savings-service';
import { ISaving, ISavingsBucket, IMonthlySavingsGroup } from '../interfaces/ISaving';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-savings',
  styleUrl: './savings.css',
  templateUrl: './savings.html',
})
export class Savings implements OnInit {

  userId: number = 0;
  rawSavings: ISaving[] = [];
  buckets: ISavingsBucket[] = [];
  totalSavingsOverall: number = 0;

  // Selected Bucket for Level 2 History View
  selectedBucket: ISavingsBucket | null = null;
  monthlyGroups: IMonthlySavingsGroup[] = [];
  filteredMonthlyGroups: IMonthlySavingsGroup[] = [];
  availableMonthYears: string[] = [];
  selectedMonthFilter: string = 'ALL';
  filteredHistoryTotal: number = 0;

  // Modals & Drawers Control
  isAddBucketOpen: boolean = false;
  isHistoryModalOpen: boolean = false;
  isQuickDepositDrawerOpen: boolean = false;

  // Form Fields
  formBankName: string = '';
  formReason: string = '';
  formAmount: number | null = null;
  formSavingsDate: string = '';
  formTargetAmount: number | null = null;
  formNotes: string = '';

  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private savingsService: SavingsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userId = user.userId;
    }
    this.setDefaultDate();
    this.loadSavings();
  }

  setDefaultDate(): void {
    const today = new Date();
    this.formSavingsDate = today.toISOString().split('T')[0];
  }

  loadSavings(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this.savingsService.getAllSavings(this.userId).subscribe({
      next: (data: ISaving[]) => {
        this.rawSavings = data || [];
        this.processBuckets();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching savings:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Group raw savings by Bank Name and Reason
  processBuckets(): void {
    const map = new Map<string, ISavingsBucket>();
    let overall = 0;

    for (const item of this.rawSavings) {
      const key = `${item.bankName.trim().toLowerCase()}___${item.reason.trim().toLowerCase()}`;
      overall += Number(item.amount);

      if (!map.has(key)) {
        map.set(key, {
          bankName: item.bankName.trim(),
          reason: item.reason.trim(),
          totalBalance: Number(item.amount),
          targetAmount: item.targetAmount ? Number(item.targetAmount) : null,
          transactionCount: 1,
          lastDepositDate: item.savingsDate,
          transactions: [item]
        });
      } else {
        const bucket = map.get(key)!;
        bucket.totalBalance += Number(item.amount);
        bucket.transactionCount += 1;
        if (item.targetAmount && !bucket.targetAmount) {
          bucket.targetAmount = Number(item.targetAmount);
        }
        bucket.transactions.push(item);
      }
    }

    this.totalSavingsOverall = overall;
    this.buckets = Array.from(map.values());

    // If history modal is currently open, refresh the selected bucket view
    if (this.selectedBucket) {
      const updated = this.buckets.find(
        b => b.bankName.toLowerCase() === this.selectedBucket!.bankName.toLowerCase() &&
             b.reason.toLowerCase() === this.selectedBucket!.reason.toLowerCase()
      );
      if (updated) {
        this.openHistory(updated);
      }
    }
  }

  // Level 2: Open History Modal and Group by Month & Year
  openHistory(bucket: ISavingsBucket): void {
    this.selectedBucket = bucket;
    this.selectedMonthFilter = 'ALL';

    // Sort bucket transactions newest first
    const sorted = [...bucket.transactions].sort((a, b) => 
      new Date(b.savingsDate).getTime() - new Date(a.savingsDate).getTime()
    );

    // Group by Month Year (e.g. "August 2026", "May 2025")
    const groupMap = new Map<string, { total: number; items: ISaving[] }>();
    const monthSet = new Set<string>();

    for (const item of sorted) {
      const dateObj = new Date(item.savingsDate);
      const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      monthSet.add(monthYear);

      if (!groupMap.has(monthYear)) {
        groupMap.set(monthYear, { total: Number(item.amount), items: [item] });
      } else {
        const group = groupMap.get(monthYear)!;
        group.total += Number(item.amount);
        group.items.push(item);
      }
    }

    this.availableMonthYears = Array.from(monthSet);
    this.monthlyGroups = Array.from(groupMap.entries()).map(([monthYearKey, data]) => ({
      monthYearKey,
      monthTotal: data.total,
      items: data.items
    }));

    this.filteredMonthlyGroups = [...this.monthlyGroups];
    this.calculateFilteredTotal();
    this.isHistoryModalOpen = true;
    this.cdr.detectChanges();
  }

  closeHistoryModal(): void {
    this.isHistoryModalOpen = false;
    this.selectedBucket = null;
  }

  // Month-Year Filter Change
  onMonthFilterChange(selected: string): void {
    this.selectedMonthFilter = selected;
    if (selected === 'ALL') {
      this.filteredMonthlyGroups = [...this.monthlyGroups];
    } else {
      this.filteredMonthlyGroups = this.monthlyGroups.filter(g => g.monthYearKey === selected);
    }
    this.calculateFilteredTotal();
  }

  calculateFilteredTotal(): void {
    this.filteredHistoryTotal = this.filteredMonthlyGroups.reduce((acc, curr) => acc + curr.monthTotal, 0);
  }

  // Open "Add Savings / Bucket" Drawer
  openAddSavings(presetBucket?: ISavingsBucket): void {
    this.setDefaultDate();
    this.errorMessage = '';
    this.successMessage = '';

    if (presetBucket) {
      this.formBankName = presetBucket.bankName;
      this.formReason = presetBucket.reason;
      this.formTargetAmount = presetBucket.targetAmount || null;
    } else {
      this.formBankName = '';
      this.formReason = '';
      this.formTargetAmount = null;
    }

    this.formAmount = null;
    this.formNotes = '';
    this.isAddBucketOpen = true;
  }

  closeAddSavings(): void {
    this.isAddBucketOpen = false;
  }

  // Quick Preset Deposit (+₹1,000, +₹5,000, etc.)
  quickDeposit(amount: number): void {
    if (!this.selectedBucket) return;
    this.formBankName = this.selectedBucket.bankName;
    this.formReason = this.selectedBucket.reason;
    this.formAmount = amount;
    this.formTargetAmount = this.selectedBucket.targetAmount || null;
    this.formNotes = 'Quick deposit';
    this.setDefaultDate();
    this.saveSavingsEntry();
  }

  // Submit Savings
  saveSavingsEntry(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.formBankName.trim() || !this.formReason.trim() || !this.formAmount || this.formAmount <= 0) {
      this.errorMessage = 'Please provide valid Bank Name, Purpose, and Amount.';
      return;
    }

    const payload: ISaving = {
      userId: this.userId,
      bankName: this.formBankName.trim(),
      reason: this.formReason.trim(),
      amount: Number(this.formAmount),
      savingsDate: this.formSavingsDate ? new Date(this.formSavingsDate).toISOString() : new Date().toISOString(),
      targetAmount: this.formTargetAmount ? Number(this.formTargetAmount) : null,
      notes: this.formNotes ? this.formNotes.trim() : null
    };

    this.isLoading = true;
    this.savingsService.addSavings(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Savings added successfully!';
        this.closeAddSavings();
        this.loadSavings();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error adding savings:', err);
        this.errorMessage = 'Failed to save. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  deleteSaving(savingsId?: number): void {
    if (!savingsId) return;
    if (!confirm('Are you sure you want to delete this savings record?')) return;

    this.savingsService.deleteSaving(savingsId).subscribe({
      next: () => {
        this.loadSavings();
      },
      error: (err) => {
        console.error('Error deleting saving:', err);
      }
    });
  }

  // Helpers
  getProgressPercentage(bucket: ISavingsBucket): number {
    if (!bucket.targetAmount || bucket.targetAmount <= 0) return 0;
    const pct = Math.round((bucket.totalBalance / bucket.targetAmount) * 100);
    return Math.min(pct, 100);
  }

  getBankIcon(bankName: string): string {
    const name = bankName.toLowerCase();
    if (name.includes('hdfc')) return '🏦';
    if (name.includes('sbi')) return '🏛️';
    if (name.includes('icici')) return '🏢';
    if (name.includes('axis')) return '💳';
    if (name.includes('zerodha') || name.includes('groww')) return '📈';
    if (name.includes('cash')) return '💵';
    return '💰';
  }
}

