using StudentManagement.Server.DTOs;
using StudentManagement.Server.Models;

namespace StudentManagement.Server.Services
{
    public interface IStudentService
    {
        IEnumerable<Student> GetAll();
        Student GetById(int id);
        void Add(StudentDTO dto);
        void Update(int id, StudentDTO dto);
        void Delete(int id);
    }
}