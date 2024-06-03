import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient, private loadingService: LoadingService) {
    this.getCourses()
  }

  loadCourseById(courseId: number) {
    return this.httpClient.get<Course>(`api/courses/${courseId}`).pipe(shareReplay())
  }
  loadAllCourseLessons(courseId: number): Observable<any> {
    const loading = this.httpClient.get(`/api/lessons`, {
      params: {
        pageSize: 10000,
        courseId
      }
    }).pipe(map(res => res["payload"]), shareReplay())
    this.loadingService.showLoaderUntilCompleted(loading).subscribe()
    return loading

  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('/api/courses').pipe(shareReplay())
  }
  postCourse(courseId: string, changes: Partial<Course>): Observable<unknown> {
    return this.httpClient.put(`/api/courses/${courseId}`, changes).pipe(shareReplay())
  }
  filterCourses(filter: string) {
    return this.httpClient.get(`/api/lessons`, {
      params: {
        filter, pageSize: 100
      }
    }).pipe(map(res => res["payload"]), shareReplay())
  }
}
