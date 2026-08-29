using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SavingsController : ControllerBase
    {
        private readonly SavingsRepository _savingsRepository;

        public SavingsController(SavingsRepository savingsRepository)
        {
            _savingsRepository = savingsRepository;
        }

        [HttpGet("allSavings")]
        public IActionResult GetAllSavings([FromQuery] int userId)
        {
            var savings = _savingsRepository.GetAllSavings(userId);
            return Ok(savings);
        }

        [HttpPost("addSavings")]
        public IActionResult AddSavings([FromBody] Saving saving)
        {
            var id = _savingsRepository.AddSaving(saving);
            return Ok(id);
        }

        [HttpDelete("deleteSaving/{id}")]
        public IActionResult DeleteSaving(int id)
        {
            var success = _savingsRepository.DeleteSaving(id);
            return Ok(success);
        }
    }
}

