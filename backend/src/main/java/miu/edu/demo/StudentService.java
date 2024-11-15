package miu.edu.demo;

import java.util.List;

public interface StudentService {

    public List<Student> findAll();

    public void save(Student student);

    public void delete(int id);

    public void update(int id, Student s);

    public Student findById(int id);

    public List<Course> getCoursesByStudentId(int sId);

    public List<Student>findByGpaLessThan(double gpa);

    public List<Student> findByProgram(String programLevel);
}
