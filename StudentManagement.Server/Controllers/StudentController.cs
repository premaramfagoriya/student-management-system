using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.Server.DTOs;
using StudentManagement.Server.Services;
using StudentManagement.Server.Models;

namespace StudentManagement.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        // ================= GET ALL =================
        [HttpGet]
        public IActionResult GetAll()
        {
            var students = _service.GetAll();
            return Ok(students);
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var student = _service.GetById(id);
            return Ok(student);
        }

        // ================= ADD =================
        [HttpPost]
        public IActionResult Add([FromBody] StudentDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _service.Add(dto);
            return StatusCode(201, new { message = "Student created successfully" });
        }

        // ================= UPDATE =================
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StudentDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _service.Update(id, dto);
            return Ok(new { message = "Student updated successfully" });
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok(new { message = "Student deleted successfully" });
        }
    }
}