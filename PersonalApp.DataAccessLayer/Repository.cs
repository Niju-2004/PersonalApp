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
    }
}
