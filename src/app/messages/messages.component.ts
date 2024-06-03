import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  errors: string[] = []
  constructor(public messageService: MessagesService) {
  }

  ngOnInit() {
    this.messageService.errors$.subscribe(errors => {
      this.errors = errors
    })

  }


  onClose(errorToBeDeleted: string) {
    this.errors = this.errors.filter(error => error !== errorToBeDeleted)

  }

}
