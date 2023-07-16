import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentsComponent } from './students/students.component';
import { PerformanceComponent } from './performance/performance.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'performance/:id',
    component: PerformanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
