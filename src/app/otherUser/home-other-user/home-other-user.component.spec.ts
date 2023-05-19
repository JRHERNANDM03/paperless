import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOtherUserComponent } from './home-other-user.component';

describe('HomeOtherUserComponent', () => {
  let component: HomeOtherUserComponent;
  let fixture: ComponentFixture<HomeOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOtherUserComponent]
    });
    fixture = TestBed.createComponent(HomeOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
