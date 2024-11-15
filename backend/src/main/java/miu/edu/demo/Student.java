package miu.edu.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {

    private int id;
    private String name;
    private double gpa;

    private List<Course> courseList;

}
