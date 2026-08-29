using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;
using PersonalApp.DataAccessLayer.Entities;

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

        [HttpGet("UserInformation")]

        public User userInformationCT(string Email, string Password)
        { 
            var res = _repository.userInformation(Email, Password);
            return res;
            
        }

        [HttpPost("userRegistration")]

        public IActionResult userRegistrationCT(User user)
        {
            var res = _repository.userRegistration(user);
            return Ok(res);
        }
    }
}
