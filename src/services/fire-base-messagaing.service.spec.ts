import { TestBed } from '@angular/core/testing';

import { FireBaseMessagaingService } from './fire-base-messagaing.service';

describe('FireBaseMessagaingService', () => {
  let service: FireBaseMessagaingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireBaseMessagaingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
