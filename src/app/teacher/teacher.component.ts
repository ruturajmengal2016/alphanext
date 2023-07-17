import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent {
  constructor(
    private client: HttpClient,
    private readonly route: Router,
    private readonly service: AppService
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
        .post('https://alphabackend.onrender.com/api/teacher/register', {
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
        .post('https://alphabackend.onrender.com/api/login', {
          email: this.details.email,
          password: this.details.password,
        })
        .subscribe({
          next: (response: any) => {
            this.service.tearcherId = response.id;
            this.route.navigate([
              '/students',
              { id: response.id, name: response.name, email: response.email },
            ]);
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
