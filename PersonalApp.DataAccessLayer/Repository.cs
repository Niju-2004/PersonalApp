using System;
using System.Collections.Generic;
using System.Text;
using PersonalApp.DataAccessLayer.Entities;
using PersonalApp.DataAccessLayer.Data;

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
    }
}
