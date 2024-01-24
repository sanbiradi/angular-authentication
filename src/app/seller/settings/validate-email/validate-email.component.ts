import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {
token!:string;
message!:string;
  constructor(private authService:AuthService,private httpService:HttpService, private activateedRoute:ActivatedRoute){
    this.token = this.activateedRoute.snapshot.queryParams['token'];
    console.log(this.token)
  }
  success!:boolean;
  ngOnInit(){
    let url = `${this.authService.baseUrl}/auth/verify-email`;
    this.httpService.verifyAccount(url,this.token).subscribe(data=>{
      this.message = data;
      this.success = true;
    },error=>{
      this.message = error;
    })
  }
}
