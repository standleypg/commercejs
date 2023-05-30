import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;

  const mockAngularFireAuth: any = {
    auth: jasmine.createSpyObj('AngularFireAuth', [
      'signInWithPopup',
      'signOut',
    ]),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
