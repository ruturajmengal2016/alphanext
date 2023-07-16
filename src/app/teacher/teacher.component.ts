import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  constructor(
    private data: AppService,
    private client: HttpClient,
    private readonly route: Router
  ) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  change = true;

  details = { name: '', email: '', password: '' };

  fillValue(event: any) {
    this.details = {
      ...this.details,
      [event.target.name]: event.target.value,
    };
  }

  async register() {
    if (this.details.email && this.details.password) {
      await this.client
        .post('http://localhost:5000/api/teacher/register', {
          name: this.details.name,
          email: this.details.email,
          password: this.details.password,
        })
        .subscribe({
          next: () => {
            this.change = false;
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    } else {
      alert('All fields are required');
    }
  }

  async login(): Promise<any> {
    if (this.details.email && this.details.password) {
      return await this.client
        .post(`http://localhost:5000/api/login`, {
          email: this.details.email,
          password: this.details.password,
        })
        .subscribe({
          next: (response) => {
            this.data.teacherData = response;
            this.route.navigate(['/students']);
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }
  toggle() {
    this.change = !this.change;
  }
}
