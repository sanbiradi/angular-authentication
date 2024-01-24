import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './seller/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  

  constructor() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {}

  title = 'angular-assignment';

  ngOnInit(): void {
 
   
  }

 
}
