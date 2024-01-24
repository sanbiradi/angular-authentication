import { TestBed } from '@angular/core/testing';

import { ShophttpService } from './shophttp.service';

describe('ShophttpService', () => {
  let service: ShophttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShophttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
