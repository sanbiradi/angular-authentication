import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetchangepasswordComponent } from './resetchangepassword.component';

describe('ChangepasswordComponent', () => {
  let component: ResetchangepasswordComponent;
  let fixture: ComponentFixture<ResetchangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetchangepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
