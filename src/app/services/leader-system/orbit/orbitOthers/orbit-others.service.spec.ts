import { TestBed } from '@angular/core/testing';

import { OrbitOthersService } from './orbit-others.service';

describe('OrbitOthersService', () => {
  let service: OrbitOthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbitOthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
