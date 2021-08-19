import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { IMail } from '../../models/mail.interface';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{title | async}}</h2>
    <mail-item
      *ngFor="let message of messages"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent implements OnInit{

  messages!:IMail[];
  title:Observable<string>=this.route.params.pipe(pluck('name'));
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.messages = this.route.snapshot.data['messages'];
       //console.log(this.messages);
    });
  }


  /*messages: Mail[] = [{
    "id": 1,
    "folder": "inbox",
    "from": "Jane Smith",
    "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lobortis, neque at ultricies fringilla, ligula metus",
    "timestamp": 1487848162905
  }];*/
}
