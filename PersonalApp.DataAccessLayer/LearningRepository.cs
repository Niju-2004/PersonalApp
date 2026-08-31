using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PersonalApp.DataAccessLayer.Data;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.DataAccessLayer
{
    public class LearningRepository
    {
        private readonly PersonalDashboardDbContext _context;

        public LearningRepository(PersonalDashboardDbContext context)
        {
            _context = context;
        }

        public List<LearningItem> GetAllSubjects(int userId)
        {
            return _context.LearningItems
                .Where(l => l.UserId == userId)
                .OrderBy(l => l.Name)
                .ToList();
        }

        public int AddSubject(LearningItem item)
        {
            if (string.IsNullOrWhiteSpace(item.Status))
            {
                item.Status = "In Progress";
            }

            _context.LearningItems.Add(item);
            _context.SaveChanges();
            return item.LearningItemId;
        }

        public bool DeleteSubject(int learningItemId)
        {
            var item = _context.LearningItems.Find(learningItemId);
            if (item != null)
            {
                _context.LearningItems.Remove(item);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public List<LearningLog> GetLogsBySubject(int learningItemId)
        {
            return _context.LearningLogs
                .Where(l => l.LearningItemId == learningItemId)
                .OrderByDescending(l => l.LearnedDate)
                .ToList();
        }

        public List<LearningLog> GetAllLogsForUser(int userId)
        {
            return _context.LearningLogs
                .Where(l => l.UserId == userId)
                .OrderByDescending(l => l.LearnedDate)
                .ToList();
        }

        public int SaveOrUpdateLog(LearningLog log)
        {
            if (log.CreatedAt == default)
            {
                log.CreatedAt = DateTime.UtcNow;
            }

            // Check if log for this date and subject already exists
            var existing = _context.LearningLogs.FirstOrDefault(l =>
                l.LearningItemId == log.LearningItemId &&
                l.LearnedDate.Date == log.LearnedDate.Date
            );

            if (existing != null)
            {
                existing.TopicCovered = log.TopicCovered;
                existing.Notes = log.Notes;
                _context.SaveChanges();
                return existing.LogId;
            }
            else
            {
                _context.LearningLogs.Add(log);
                _context.SaveChanges();
                return log.LogId;
            }
        }

        public bool DeleteLog(int logId)
        {
            var log = _context.LearningLogs.Find(logId);
            if (log != null)
            {
                _context.LearningLogs.Remove(log);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool UntickDate(int learningItemId, DateTime date)
        {
            var existing = _context.LearningLogs.FirstOrDefault(l =>
                l.LearningItemId == learningItemId &&
                l.LearnedDate.Date == date.Date
            );

            if (existing != null)
            {
                _context.LearningLogs.Remove(existing);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}

