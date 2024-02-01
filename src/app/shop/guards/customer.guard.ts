import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.flag(localStorage.getItem('loginedUser')||'');
  }

  flag(str:string) {
    if (str.length > 0) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
