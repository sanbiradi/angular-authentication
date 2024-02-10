import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOrdersComponent } from './see-orders.component';

describe('SeeOrdersComponent', () => {
  let component: SeeOrdersComponent;
  let fixture: ComponentFixture<SeeOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeOrdersComponent]
    });
    fixture = TestBed.createComponent(SeeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
