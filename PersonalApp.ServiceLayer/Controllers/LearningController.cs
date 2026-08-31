using System;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearningController : ControllerBase
    {
        private readonly LearningRepository _learningRepository;

        public LearningController(LearningRepository learningRepository)
        {
            _learningRepository = learningRepository;
        }

        [HttpGet("allSubjects")]
        public IActionResult GetAllSubjects([FromQuery] int userId)
        {
            var subjects = _learningRepository.GetAllSubjects(userId);
            return Ok(subjects);
        }

        [HttpPost("addSubject")]
        public IActionResult AddSubject([FromBody] LearningItem item)
        {
            var id = _learningRepository.AddSubject(item);
            return Ok(id);
        }

        [HttpDelete("deleteSubject/{id}")]
        public IActionResult DeleteSubject(int id)
        {
            var success = _learningRepository.DeleteSubject(id);
            return Ok(success);
        }

        [HttpGet("subjectLogs")]
        public IActionResult GetLogsBySubject([FromQuery] int learningItemId)
        {
            var logs = _learningRepository.GetLogsBySubject(learningItemId);
            return Ok(logs);
        }

        [HttpGet("allLogs")]
        public IActionResult GetAllLogsForUser([FromQuery] int userId)
        {
            var logs = _learningRepository.GetAllLogsForUser(userId);
            return Ok(logs);
        }

        [HttpPost("saveLog")]
        public IActionResult SaveOrUpdateLog([FromBody] LearningLog log)
        {
            var id = _learningRepository.SaveOrUpdateLog(log);
            return Ok(id);
        }

        [HttpDelete("deleteLog/{id}")]
        public IActionResult DeleteLog(int id)
        {
            var success = _learningRepository.DeleteLog(id);
            return Ok(success);
        }

        [HttpPost("untickDate")]
        public IActionResult UntickDate([FromBody] UntickDateDto dto)
        {
            var success = _learningRepository.UntickDate(dto.LearningItemId, dto.Date);
            return Ok(success);
        }
    }

    public class UntickDateDto
    {
        public int LearningItemId { get; set; }
        public DateTime Date { get; set; }
    }
}

