import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  

  constructor(private authService: AuthService, private router: Router) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {}

  title = 'angular-assignment';

  ngOnInit(): void {
 
   
  }

 
}
