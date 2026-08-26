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

        [HttpGet("Userverify")]

        public IActionResult userVerifyCT(string Email, string Password)
        {
            var res = _repository.userVerify(Email, Password);

            return Ok(res);
        }
    }
}
