using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly Repository _repository;
        public TasksController(Repository respository)
        {
            _repository = respository;
        }

        [HttpGet("allTasks")]
        public ActionResult<List<DataAccessLayer.Entities.Task>> getAllTasks(int userId)
        {
            var tasks = _repository.allTasks(userId);
            return tasks;
        }
    }
}
