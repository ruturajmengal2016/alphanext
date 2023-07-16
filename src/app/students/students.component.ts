import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class DialogElementsExampleDialog {
  fields: string[] = ['name', 'email', 'roll_no', 'age', 'gender', 'class'];
  data = {
    name: '',
    email: '',
    roll_no: null,
    age: null,
    gender: '',
    class: '',
  };
  constructor(
    private readonly client: HttpClient,
    private readonly service: AppService
  ) {}
  saveData(event: any) {
    this.data = { ...this.data, [event.target.name]: event.target.value };
  }
  async show() {
    if (
      this.data.age &&
      this.data.name &&
      this.data.class &&
      this.data.email &&
      this.data.roll_no
    ) {
      await this.client
        .post('http://localhost:5000/api/student/register', {
          name: this.data.name,
          email: this.data.email,
          roll_no: Number(this.data.roll_no),
          age: Number(this.data.age),
          gender: this.data.gender,
          class: this.data.class,
          teacherId: this.service.teacherData.id,
        })
        .subscribe({
          next: () => {
            console.log('created');
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    } else {
      alert('All fields are required');
    }
  }
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  students: any;
  constructor(
    private readonly data: AppService,
    private readonly client: HttpClient,
    public dialog: MatDialog
  ) {
    this.data.getPosts().subscribe((data) => {
      this.students = data;
    });
  }

  sortbyAtoZ() {
    this.students = this.students.sort(function (a: any, b: any) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    console.log(this.students);
  }
  sortbyAge() {
    this.students = this.students.sort((a: any, b: any) => {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    });
    console.log(this.students);
  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog, {
      minWidth: '30%',
    });
  }
  async delete(id: string) {
    return await this.client
      .delete(`http://localhost:5000/api/student/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
