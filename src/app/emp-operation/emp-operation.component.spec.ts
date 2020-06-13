import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOperationComponent } from './emp-operation.component';

describe('EmpOperationComponent', () => {
  let component: EmpOperationComponent;
  let fixture: ComponentFixture<EmpOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
