import { TestBed } from '@angular/core/testing';

import { AuthServcieService } from './auth-servcie.service';

describe('AuthServcieService', () => {
  let service: AuthServcieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServcieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
