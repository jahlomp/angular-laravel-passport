import { TestBed, inject } from '@angular/core/testing';

import { LaravelPassportService } from './laravel-passport.service';

describe('LaravelPassportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaravelPassportService]
    });
  });

  it('should be created', inject([LaravelPassportService], (service: LaravelPassportService) => {
    expect(service).toBeTruthy();
  }));
});
