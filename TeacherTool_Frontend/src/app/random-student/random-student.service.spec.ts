import { TestBed } from '@angular/core/testing';

import { RandomStudentService } from './random-student.service';

describe('RandomStudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomStudentService = TestBed.get(RandomStudentService);
    expect(service).toBeTruthy();
  });
});
