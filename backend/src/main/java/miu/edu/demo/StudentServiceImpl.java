package miu.edu.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentRepo studentRepo;

    @Override
    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    @Override
    public void save(Student student) {
        studentRepo.save(student);
    }

    @Override
    public void delete(int id) {
        studentRepo.delete(id);
    }

    @Override
    public void update(int id, Student s) {
studentRepo.update(id,s);
    }

    @Override
    public Student findById(int id) {
        return studentRepo.findById(id);
    }

    @Override
    public List<Course> getCoursesByStudentId(int sId) {
        return studentRepo.getCoursesByStudentId(sId);
    }

    @Override
    public List<Student> findByGpaLessThan(double gpa) {
        return studentRepo.findByGpaLessThan(gpa);
    }

    @Override
    public List<Student> findByProgram(String programLevel) {
        return studentRepo.findByProgram(programLevel);
    }


}
