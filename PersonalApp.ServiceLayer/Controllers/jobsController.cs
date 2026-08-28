using Microsoft.AspNetCore.Mvc;
using PersonalApp.DataAccessLayer;
using PersonalApp.DataAccessLayer.Entities;

namespace PersonalApp.ServiceLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class jobsController : ControllerBase
    {
        private readonly Repository _repository;
        public jobsController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet("allJobs")]
        public ActionResult<List<JobApplication>> allJobsCT(int UserId)
        {
            var res = _repository.AllJobs(UserId);
            return res;
        }
    }
}
