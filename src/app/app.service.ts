import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppService implements OnInit {
  private url = 'http://localhost:5000/api/teacher/ruturajmengal2016@gmail.com';
  students: any;
  teacherData: any;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.url).subscribe((data) => {
      this.students = data;
    });
  }
  ngOnInit(): void {}
  getPosts() {
    return this.httpClient.get(this.url);
  }
}
