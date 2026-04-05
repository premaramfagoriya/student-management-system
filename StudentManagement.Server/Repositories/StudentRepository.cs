using System.Data.SqlClient;
using StudentManagement.Server.Models;
namespace StudentManagement.Server.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly string _connection;

        public StudentRepository(IConfiguration config)
        {
            _connection = config.GetConnectionString("DefaultConnection");
        }

        public IEnumerable<Student> GetAll()
        {
            var list = new List<Student>();
            using var con = new SqlConnection(_connection);
            con.Open();

            var cmd = new SqlCommand("SELECT * FROM Students", con);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Student
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    Age = (int)reader["Age"],
                    Course = reader["Course"].ToString(),
                    CreatedDate = (DateTime)reader["CreatedDate"]
                });
            }

            return list;
        }

        public void Add(Student s)
        {
            using var con = new SqlConnection(_connection);
            con.Open();

            var cmd = new SqlCommand(
                "INSERT INTO Students(Name,Email,Age,Course) VALUES(@Name,@Email,@Age,@Course)", con);

            cmd.Parameters.AddWithValue("@Name", s.Name);
            cmd.Parameters.AddWithValue("@Email", s.Email);
            cmd.Parameters.AddWithValue("@Age", s.Age);
            cmd.Parameters.AddWithValue("@Course", s.Course);

            cmd.ExecuteNonQuery();
        }

        public void Update(Student s)
        {
            using var con = new SqlConnection(_connection);
            con.Open();

            var cmd = new SqlCommand(
                "UPDATE Students SET Name=@Name, Email=@Email, Age=@Age, Course=@Course WHERE Id=@Id", con);

            cmd.Parameters.AddWithValue("@Id", s.Id);
            cmd.Parameters.AddWithValue("@Name", s.Name);
            cmd.Parameters.AddWithValue("@Email", s.Email);
            cmd.Parameters.AddWithValue("@Age", s.Age);
            cmd.Parameters.AddWithValue("@Course", s.Course);

            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var con = new SqlConnection(_connection);
            con.Open();

            var cmd = new SqlCommand("DELETE FROM Students WHERE Id=@Id", con);
            cmd.Parameters.AddWithValue("@Id", id);

            cmd.ExecuteNonQuery();
        }

        public Student GetById(int id)
        {
            using var con = new SqlConnection(_connection);
            con.Open();

            var cmd = new SqlCommand("SELECT * FROM Students WHERE Id=@Id", con);
            cmd.Parameters.AddWithValue("@Id", id);

            var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Student
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    Age = (int)reader["Age"],
                    Course = reader["Course"].ToString(),
                    CreatedDate = (DateTime)reader["CreatedDate"]
                };
            }

            return null;
        }
    }

}