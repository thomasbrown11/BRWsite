import { TestBed } from '@angular/core/testing';

import { InstagramCacheService } from './instagram/instagram-cache.service';

describe('InstagramCacheService', () => {
  let service: InstagramCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
