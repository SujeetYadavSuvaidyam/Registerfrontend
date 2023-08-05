import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { AuthGuard } from '../guard/authguard.guard'; // Make sure the import path is correct for your 'authguard.guard' file

describe('AuthGuardGuard', () => {
  let guard: CanActivate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard); // Get the instance of the AuthGuardGuard from the TestBed
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
