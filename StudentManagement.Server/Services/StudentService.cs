using StudentManagement.Server.DTOs;
using StudentManagement.Server.Models;
using StudentManagement.Server.Repositories;

namespace StudentManagement.Server.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repo;

        public StudentService(IStudentRepository repo)
        {
            _repo = repo;
        }

        // ================= GET ALL =================
        public IEnumerable<Student> GetAll()
        {
            return _repo.GetAll();
        }

        // ================= GET BY ID =================
        public Student GetById(int id)
        {
            var student = _repo.GetById(id);

            if (student == null)
                throw new Exception("Student not found");

            return student;
        }

        // ================= ADD =================
        public void Add(StudentDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new Exception("Name is required");

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new Exception("Email is required");

            if (dto.Age <= 0)
                throw new Exception("Invalid age");

            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Age = dto.Age,
                Course = dto.Course,
                CreatedDate = DateTime.Now
            };

            _repo.Add(student);
        }

        // ================= UPDATE =================
        public void Update(int id, StudentDTO dto)
        {
            var existing = _repo.GetById(id);

            if (existing == null)
                throw new Exception("Student not found");

            existing.Name = dto.Name;
            existing.Email = dto.Email;
            existing.Age = dto.Age;
            existing.Course = dto.Course;

            _repo.Update(existing);
        }

        // ================= DELETE =================
        public void Delete(int id)
        {
            var existing = _repo.GetById(id);

            if (existing == null)
                throw new Exception("Student not found");

            _repo.Delete(id);
        }
    }
}