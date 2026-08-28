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
        private readonly JobRepository _jobRepository;
        public jobsController(Repository repository, JobRepository jobRepository)
        {
            _repository = repository;
            _jobRepository = jobRepository;
        }

        [HttpGet("allJobs")]
        public ActionResult<List<JobApplication>> allJobsCT(int UserId)
        {
            var res = _repository.AllJobs(UserId);
            return res;
        }

        [HttpPost("addJob")]
        public IActionResult addJobsCT(JobApplication job)
        {
            var res = _jobRepository.addJobs(job);
            return Ok(res);
        }
    }
}
