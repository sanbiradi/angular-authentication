import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customerLoginGuard } from './customer-login.guard';

describe('customerLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customerLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
