using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PersonalApp.DataAccessLayer.Data;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.DataAccessLayer
{
    public class AdminRepository
    {
        private readonly PersonalDashboardDbContext _context;

        public AdminRepository(PersonalDashboardDbContext context)
        {
            _context = context;
        }

        public AdminAnalyticsDto GetSystemAnalytics()
        {
            var totalUsers = _context.Users.Count();
            var totalJobs = _context.JobApplications.Count();
            var totalSavings = _context.Savings.Sum(s => (decimal?)s.Amount) ?? 0;
            var totalLearningLogs = _context.LearningLogs.Count();
            var totalTasks = _context.Tasks.Count();
            var totalSubjects = _context.LearningItems.Count();

            return new AdminAnalyticsDto
            {
                TotalUsers = totalUsers,
                TotalJobs = totalJobs,
                TotalSavingsAmount = totalSavings,
                TotalLearningLogs = totalLearningLogs,
                TotalTasks = totalTasks,
                TotalSubjects = totalSubjects
            };
        }

        public List<AdminUserDetailDto> GetAllUsersDetailed()
        {
            var users = _context.Users.OrderByDescending(u => u.CreatedAt).ToList();
            var result = new List<AdminUserDetailDto>();

            foreach (var u in users)
            {
                var isMasterAdmin = u.Email.Equals("admin", StringComparison.OrdinalIgnoreCase);
                var jobsCount = _context.JobApplications.Count(j => j.UserId == u.UserId);
                var savingsTotal = _context.Savings.Where(s => s.UserId == u.UserId).Sum(s => (decimal?)s.Amount) ?? 0;
                var learningCount = _context.LearningLogs.Count(l => l.UserId == u.UserId);
                var tasksCount = _context.Tasks.Count(t => t.UserId == u.UserId);
                var completedTasks = _context.Tasks.Count(t => t.UserId == u.UserId && t.Status == "Completed");

                result.Add(new AdminUserDetailDto
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    CreatedAt = u.CreatedAt,
                    Role = isMasterAdmin ? "Master Admin" : "Standard User",
                    IsAdmin = isMasterAdmin,
                    JobsCount = jobsCount,
                    TotalSavings = savingsTotal,
                    LearningLogsCount = learningCount,
                    TasksCount = tasksCount,
                    CompletedTasksCount = completedTasks
                });
            }

            return result;
        }

        public bool DeleteUser(int userId)
        {
            var user = _context.Users.Find(userId);
            if (user == null) return false;

            // Protect Master Admin from deletion
            if (user.Email.Equals("admin", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            // Clean up all user dependencies safely
            var savings = _context.Savings.Where(s => s.UserId == userId);
            _context.Savings.RemoveRange(savings);

            var logs = _context.LearningLogs.Where(l => l.UserId == userId);
            _context.LearningLogs.RemoveRange(logs);

            var subjects = _context.LearningItems.Where(l => l.UserId == userId);
            _context.LearningItems.RemoveRange(subjects);

            var jobs = _context.JobApplications.Where(j => j.UserId == userId);
            _context.JobApplications.RemoveRange(jobs);

            var tasks = _context.Tasks.Where(t => t.UserId == userId);
            _context.Tasks.RemoveRange(tasks);

            var expenses = _context.Expenses.Where(e => e.UserId == userId);
            _context.Expenses.RemoveRange(expenses);

            var categories = _context.ExpenseCategories.Where(c => c.UserId == userId);
            _context.ExpenseCategories.RemoveRange(categories);

            var goals = _context.Goals.Where(g => g.UserId == userId);
            _context.Goals.RemoveRange(goals);

            _context.Users.Remove(user);
            _context.SaveChanges();
            return true;
        }
    }

    public class AdminAnalyticsDto
    {
        public int TotalUsers { get; set; }
        public int TotalJobs { get; set; }
        public decimal TotalSavingsAmount { get; set; }
        public int TotalLearningLogs { get; set; }
        public int TotalTasks { get; set; }
        public int TotalSubjects { get; set; }
    }

    public class AdminUserDetailDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string Role { get; set; } = null!;
        public bool IsAdmin { get; set; }
        public int JobsCount { get; set; }
        public decimal TotalSavings { get; set; }
        public int LearningLogsCount { get; set; }
        public int TasksCount { get; set; }
        public int CompletedTasksCount { get; set; }
    }
}

