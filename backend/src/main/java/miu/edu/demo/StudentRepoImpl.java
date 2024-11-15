package miu.edu.demo;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class StudentRepoImpl implements StudentRepo{

    private static List<Student> students;
    private static int studentId = 114;
    static {
        students = new ArrayList<>();
        Course c105 = new Course(105, "Problem Solving", "BSC");
        Course c201 = new Course(201, "Procedural Programming","BSC");
        Course c221 = new Course(221, "Data Structures","BSC");
        Course c545 = new Course(545, "Web Application Architecture","MSC");
        Course c551 = new Course(551, "Enterprise Architecture","MSC");

        Student s1 = new Student(111,"Zaineh",3.6, new ArrayList<>(Arrays.asList(c201,c221,c545)));
        Student s2 = new Student(112,"Yasmeen",3.9, new ArrayList<>(Arrays.asList(c551,c545)));
        Student s3 = new Student(113,"Mira",3.3, new ArrayList<>(Arrays.asList(c105,c201,c221)));

        students.add(s1);
        students.add(s2);
        students.add(s3);
    }


    public List<Student> findAll(){
        return students;
    }

    public void save(Student student) {
        student.setId(studentId); // We are auto generating the id for DEMO purposes, (Normally, do not change your parameters)
        studentId++;
        students.add(student);
    }


    @Override
    public void delete(int id) {
        var product = students
                .stream()
                .filter(l -> l.getId() == id)
                .findFirst().get();
        students.remove(product);
    }

    @Override
    public void update(int id, Student p) {
        Student toUpdate = findById(id);
        toUpdate.setName(p.getName());
        toUpdate.setGpa(p.getGpa());
    }

    public Student findById(int id) {
        return students
                .stream()
                .filter(l -> l.getId() == id)
                .findFirst()
                .orElse(null);

    }

    @Override
    public List<Course> getCoursesByStudentId(int sId){
        return students.stream()
                .filter(student -> student.getId()==sId)
                .flatMap(s ->s.getCourseList().stream())
                .collect(Collectors.toList());

    }

    @Override
    public List<Student> findByGpaLessThan(double gpa) {
        return students.stream()
                .filter(s -> s.getGpa()<gpa)
                .collect(Collectors.toList());
    }

    @Override
    public List<Student> findByProgram(String programLevel) {
        return students.stream()
                .filter(s -> {
                    return s.getCourseList().stream()
                            .filter(course -> course.getProgram().equals(programLevel))
                            .findAny()
                            .isPresent();
                })
                .collect(Collectors.toList());
    }


}
