import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CourseService } from '../services/course.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CourseStore } from '../services/courses.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseStore: CourseStore,
    private messageService: MessagesService,
    @Inject(MAT_DIALOG_DATA) course: Course) {

    this.course = course;


    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngAfterViewInit() {

  }

  save() {

    const changes = this.form.value;

    this.courseStore.putCourse(this.course.id,  changes)
    this.close(changes)


    // loadPostCourse$.pipe(catchError(err => {
    //   const errorMessage = 'Could not save'
    //   this.messageService.showErrors(errorMessage)
    //   console.log(errorMessage, err);
    //   return throwError(err)
    // })).subscribe(val => {
    //   this.close(val)
    // });

  }

  close(val?: unknown) {
    this.dialogRef.close(val);
  }

}
