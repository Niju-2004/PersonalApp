using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AdminRepository _adminRepository;

        public AdminController(AdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("analytics")]
        public IActionResult GetSystemAnalytics()
        {
            var analytics = _adminRepository.GetSystemAnalytics();
            return Ok(analytics);
        }

        [HttpGet("allUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _adminRepository.GetAllUsersDetailed();
            return Ok(users);
        }

        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var success = _adminRepository.DeleteUser(id);
            if (!success)
            {
                return BadRequest("Cannot delete Master Admin or user does not exist.");
            }
            return Ok(success);
        }
    }
}

