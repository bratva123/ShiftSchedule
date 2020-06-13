import { TestBed } from '@angular/core/testing';

import { EmpOperationService } from './emp-operation.service';

describe('EmpOperationService', () => {
  let service: EmpOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
