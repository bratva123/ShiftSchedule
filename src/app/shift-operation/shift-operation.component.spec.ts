import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftOperationComponent } from './shift-operation.component';

describe('ShiftOperationComponent', () => {
  let component: ShiftOperationComponent;
  let fixture: ComponentFixture<ShiftOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
