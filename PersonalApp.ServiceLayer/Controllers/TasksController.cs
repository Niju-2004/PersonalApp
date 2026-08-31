using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;
using PersonalApp.DataAccessLayer.Entities;
using AppTask = PersonalApp.DataAccessLayer.Entities.Task;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly Repository _repository;

        public TasksController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet("allTasks")]
        public ActionResult<List<AppTask>> GetAllTasks([FromQuery] int userId)
        {
            var tasks = _repository.allTasks(userId);
            return Ok(tasks);
        }

        [HttpPost("addTask")]
        public IActionResult AddTask([FromBody] AppTask task)
        {
            var id = _repository.AddTask(task);
            return Ok(id);
        }

        [HttpPut("toggleStatus/{id}")]
        public IActionResult ToggleStatus(int id)
        {
            var success = _repository.ToggleTaskStatus(id);
            return Ok(success);
        }

        [HttpDelete("deleteTask/{id}")]
        public IActionResult DeleteTask(int id)
        {
            var success = _repository.DeleteTask(id);
            return Ok(success);
        }
    }
}

