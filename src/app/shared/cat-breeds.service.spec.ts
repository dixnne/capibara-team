import { TestBed } from '@angular/core/testing';

import { CatBreedsService } from './cat-breeds.service';

describe('CatBreedsService', () => {
  let service: CatBreedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatBreedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
