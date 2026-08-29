using System;
using System.Collections.Generic;
using System.Linq;
using PersonalApp.DataAccessLayer.Data;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.DataAccessLayer
{
    public class SavingsRepository
    {
        private readonly PersonalDashboardDbContext _context;

        public SavingsRepository(PersonalDashboardDbContext context)
        {
            _context = context;
        }

        public List<Saving> GetAllSavings(int userId)
        {
            try
            {
                return _context.Savings
                    .Where(s => s.UserId == userId)
                    .OrderByDescending(s => s.SavingsDate)
                    .ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching savings: {ex.Message}");
                throw;
            }
        }

        public int AddSaving(Saving saving)
        {
            if (saving.CreatedAt == default)
            {
                saving.CreatedAt = DateTime.UtcNow;
            }

            _context.Savings.Add(saving);
            _context.SaveChanges();

            return saving.SavingsId;
        }

        public bool DeleteSaving(int savingsId)
        {
            var item = _context.Savings.Find(savingsId);
            if (item != null)
            {
                _context.Savings.Remove(item);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}

