import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }
  
  getStudents(): void {
    this.studentService.getStudents()
    .subscribe(students => this.students = students);
  }

  add(name: string, email: string): void {
    name = name.trim();
    email = email.trim();

    if (!name || !email) { return; }
    this.studentService.addStudent({ name, email } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter(h => h !== student);
    this.studentService.deleteStudent(student.id).subscribe();
  }

}
