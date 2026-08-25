using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase    
    {
        private readonly Repository _repository;
        public UserController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet]   
        public IActionResult Index()
        {
            var users = _repository.GetAllUsers();
            return Ok(users);
        }
    }
}
