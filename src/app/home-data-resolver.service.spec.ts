import { TestBed } from '@angular/core/testing';

import { HomeDataResolverService } from './home-data-resolver.service';

describe('HomeDataResolverService', () => {
  let service: HomeDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
