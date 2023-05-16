import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDirectorComponent } from './home-director.component';

describe('HomeDirectorComponent', () => {
  let component: HomeDirectorComponent;
  let fixture: ComponentFixture<HomeDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDirectorComponent]
    });
    fixture = TestBed.createComponent(HomeDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
