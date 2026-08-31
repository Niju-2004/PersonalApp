using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PersonalApp.DataAccessLayer.Data;
using PersonalApp.DataAccessLayer.Entities;
using AppTask = PersonalApp.DataAccessLayer.Entities.Task;

namespace PersonalApp.DataAccessLayer
{
    public class Repository
    {
        private readonly PersonalDashboardDbContext _context;

        public Repository(PersonalDashboardDbContext context)
        {
            _context = context;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public int userRegistration(User user)
        {
            // Check if email already exists to prevent database constraint violation
            bool emailExists = _context.Users.Any(u => u.Email.ToLower() == user.Email.ToLower());
            if (emailExists)
            {
                return -1; // Specific code indicating duplicate email
            }

            if (user.CreatedAt == default)
            {
                user.CreatedAt = DateTime.UtcNow;
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return user.UserId;
        }

        public int userVerify(string Email, string Password)
        {
            var user = _context.Users.FirstOrDefault(
                u => u.Email == Email &&
                u.Password == Password);

            if (user == null)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }

        public User userInformation(string Email, string Password) 
        {
            var user = _context.Users.FirstOrDefault(
              u => u.Email == Email &&
              u.Password == Password);

            if (user != null)
            {
                return user;
            }
            else
            {
                return null;
            }
        }

        public List<JobApplication> AllJobs(int userId)
        {
            var alljobs = _context.JobApplications.Where(
                r => r.UserId == userId).ToList();
            return alljobs;
        }

        public List<AppTask> allTasks(int userId)
        {
            var allTasks = _context.Tasks
                .Where(r => r.UserId == userId)
                .OrderBy(r => r.Status == "Completed")
                .ThenByDescending(r => r.CreatedAt)
                .ToList();
            return allTasks;
        }

        public int AddTask(AppTask task)
        {
            if (task.CreatedAt == default)
            {
                task.CreatedAt = DateTime.UtcNow;
            }
            if (string.IsNullOrWhiteSpace(task.Status))
            {
                task.Status = "Pending";
            }
            if (string.IsNullOrWhiteSpace(task.Priority))
            {
                task.Priority = "Medium";
            }

            _context.Tasks.Add(task);
            _context.SaveChanges();
            return task.TaskId;
        }

        public bool ToggleTaskStatus(int taskId)
        {
            var task = _context.Tasks.Find(taskId);
            if (task != null)
            {
                if (task.Status == "Completed")
                {
                    task.Status = "Pending";
                    task.CompletedAt = null;
                }
                else
                {
                    task.Status = "Completed";
                    task.CompletedAt = DateTime.UtcNow;
                }
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool DeleteTask(int taskId)
        {
            var task = _context.Tasks.Find(taskId);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}

