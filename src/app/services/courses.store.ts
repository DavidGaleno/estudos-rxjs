import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, shareReplay, tap } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class CourseStore {
  private courseSubject = new BehaviorSubject<Course[]>([])
  courses$: Observable<Course[]> = this.courseSubject.asObservable()

  constructor(private httpClient: HttpClient, private loadingService: LoadingService, private messageService: MessagesService) {
    this.getCourses()
  }


  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo)))
  }
  getCourses() {
    const loadCourses$ = this.httpClient.get<Course[]>('/api/courses').pipe(
      map(res => res["payload"].sort(sortCoursesBySeqNo)),
      catchError(err => {
        const errorMessage = 'Could not load courses';
        this.messageService.showErrors(errorMessage);
        console.log(errorMessage, err)
        return throwError(err);
      }),
      tap(courses => this.courseSubject.next(courses)))
    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe()
  }
  putCourse(courseId: string, changes: Partial<Course>) {
    const oldCourses = this.updateCourses(courseId, changes)
    this.httpClient.put(`/api/courses/${courseId}`, changes).pipe(catchError(err => {
      const errorMessage = 'Could not save'
      this.messageService.showErrors(errorMessage)
      this.courseSubject.next(oldCourses)
      return throwError(err)
    }), shareReplay()).subscribe()
  }
  updateCourses(courseId: string, changes: Partial<Course>): Course[] {
    const courses = this.courseSubject.getValue()
    const index = courses.findIndex(course => course.id === courseId)
    const newCourse = { ...courses[index], ...changes }
    const oldCourses = [...courses]
    courses[index] = newCourse
    this.courseSubject.next(courses)
    return oldCourses
  }

}
