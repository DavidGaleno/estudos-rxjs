import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) {

  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('/api/courses').pipe(shareReplay())
  }
  postCourse(courseId: string, changes: Partial<Course>): Observable<unknown> {
    return this.httpClient.put(`/api/courses/${courseId}`, changes).pipe(shareReplay())
  }
}
