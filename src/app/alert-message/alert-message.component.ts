import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {
  @Input() message!:String | boolean;
  @Input() type!:boolean;
  visible = true;

  constructor(){
    setTimeout(()=>{
      this.visible = false;
    },3500)
  }
}
