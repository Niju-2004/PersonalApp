using System;
using System.Collections.Generic;
using System.Text;
using PersonalApp.DataAccessLayer.Entities;
using PersonalApp.DataAccessLayer.Data;
using Task = PersonalApp.DataAccessLayer.Entities.Task;

namespace PersonalApp.DataAccessLayer
{
    public class JobRepository
    {
        private readonly PersonalDashboardDbContext _context;

        public JobRepository(PersonalDashboardDbContext context)
        {

            _context = context;

        }

        public int addJobs(JobApplication jobs)
        {
            _context.JobApplications.Add(jobs);
            _context.SaveChanges();

            return jobs.ApplicationId;
        }
    }
}