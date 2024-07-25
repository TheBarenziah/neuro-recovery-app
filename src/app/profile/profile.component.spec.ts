// profile.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: any;
  let dbServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      currentUserSig: jest.fn().mockReturnValue({ email: 'test@example.com', username: 'TestUser', phone: '1234567890', address: '123 Test St', dateOfBirth: '1990-01-01' })
    };

    dbServiceMock = {
      set: jest.fn().mockResolvedValue(Promise.resolve())
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DatabaseService, useValue: dbServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    expect(component.user).toEqual({ email: 'test@example.com', displayName: 'TestUser', phone: '1234567890', address: '123 Test St', dateOfBirth: '1990-01-01' });
    expect(component.userProfileForm.value.username).toEqual('TestUser');
    expect(component.userProfileForm.value.email).toEqual('test@example.com');
  });

  it('should save the profile', async () => {
    component.userProfileForm.patchValue({
      username: 'UpdatedUser',
      email: 'updated@example.com',
      phone: '9876543210',
      address: '456 Test Ave',
      dateOfBirth: '1990-01-01'
    });

    await component.saveProfile();
    expect(dbServiceMock.set).toHaveBeenCalledWith('users/test@example.com', {
      username: 'UpdatedUser',
      email: 'updated@example.com',
      phone: '9876543210',
      address: '456 Test Ave',
      dateOfBirth: '1990-01-01'
    });
  });
});