import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { IMail } from '../../models/mail.interface';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'mail-view',
  styleUrls: ['mail-view.component.scss'],
  template: `
    <div class="mail-view">
      <h2> {{ display!.from }} </h2>
      <p> {{ display!.summary }} </p>
    </div>
    <div class="mail-reply">
      <textarea
        #reply_area
        (change)="updateReply(reply_area.value)"
        placeholder="Type your reply..."
        [value]="reply">
      </textarea>
      <button type="button" (click)="sendReply()">
        Send
      </button>
    </div>
  `
})
export class MailViewComponent {
  reply = '';
  hasUnsavedChanges = false;
  display!:IMail;
  //message: Observable<IMail> = this.route.data.pipe(pluck('message'));
  constructor(private route: ActivatedRoute) {
    //console.log(this.route.snapshot.data['message']);
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.display = this.route.snapshot.data['message'];
       console.log(this.display);
    });
    this.route.params.subscribe(() => {
      this.reply = '';
      this.hasUnsavedChanges = false;
    });
  }

  updateReply(value: any) {
    console.log(value);
    this.reply = value;
    this.hasUnsavedChanges = true;
  }

  sendReply() {
    console.log('Sent!', this.reply);
    this.hasUnsavedChanges = false;
  }

}
