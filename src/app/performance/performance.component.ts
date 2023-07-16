import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent implements OnInit {
  id: string | null = null;
  data: any;
  student: any;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly sever: HttpClient,
    private readonly service: AppService
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.service.students.forEach((e: any, ind: number) => {
      if (e.id === this.id) {
        this.student = this.service.students[ind];
      }
    });
  }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  ngOnInit(): void {
    this.sever.get(`http://localhost:3000/api/test/${this.id}`).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
