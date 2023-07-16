import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  details: any;
  constructor(private readonly service: AppService) {
    this.details = this.service.teacherData;
  }
}
