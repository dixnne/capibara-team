import { TestBed } from '@angular/core/testing';

import { CuteCatsService } from './cute-cats.service';

describe('CuteCatsService', () => {
  let service: CuteCatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuteCatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
