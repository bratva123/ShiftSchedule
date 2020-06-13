import { TestBed } from '@angular/core/testing';

import { ShiftOperationService } from './shift-operation.service';

describe('ShiftOperationService', () => {
  let service: ShiftOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
