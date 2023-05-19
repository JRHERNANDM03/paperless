import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChangeUserComponent } from './home-change-user.component';

describe('HomeChangeUserComponent', () => {
  let component: HomeChangeUserComponent;
  let fixture: ComponentFixture<HomeChangeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeChangeUserComponent]
    });
    fixture = TestBed.createComponent(HomeChangeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
