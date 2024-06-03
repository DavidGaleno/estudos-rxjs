import { Component, OnInit } from '@angular/core';
import { AuthStore } from './services/auth.store';
import { Observable } from 'rxjs';
import { Course } from './model/course';
import { Lesson } from './model/lesson';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(public authStore: AuthStore) {

  }

  ngOnInit() {

  }

  logout() {
    this.authStore.logout()
  }

}
