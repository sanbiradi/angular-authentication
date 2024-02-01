import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from './customer.guard';
import { Router } from '@angular/router';

describe('CustomerGuard', () => {
  let guard: CustomerGuard;
  let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should canactive return true', () => {
    localStorage.setItem('loginuser','mock')
    const can = guard.canActivate();
    expect(can).toEqual(true);
  })

  it('should guard allow', () => {
    guard.flag('abc');
    expect(guard.flag('abc')).toEqual(true);
  })

  it('should redirect', () => {
    spyOn(router, 'navigate');
    guard.flag('');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  })
});
