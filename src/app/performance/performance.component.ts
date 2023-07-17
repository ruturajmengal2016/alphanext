import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    private readonly sever: HttpClient
  ) {}
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  ngOnInit(): void {
    this.sever
      .get(
        `https://alphabackend.onrender.com/api/teacher/${this.route.snapshot.queryParamMap.get(
          'email'
        )}`
      )
      .subscribe({
        next: (response: any) => {
          this.student = response;
          this.student.forEach((element: any) => {
            if (element.id === this.route.snapshot.paramMap.get('id')) {
              this.student = element;
            }
          });
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });

    this.sever
      .get(
        `https://alphabackend.onrender.com/api/test/${this.route.snapshot.paramMap.get(
          'id'
        )}`
      )
      .subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
