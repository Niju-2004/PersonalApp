using System;
using System.Collections.Generic;
using System.Text;
using PersonalApp.DataAccessLayer.Entities;
using PersonalApp.DataAccessLayer.Data;
using Task = PersonalApp.DataAccessLayer.Entities.Task;

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

        public List<Task> allTasks(int userId)
        {
            var allTasks = _context.Tasks.Where(
                r => r.UserId == userId).ToList();
            return allTasks;
        }
    }
}
