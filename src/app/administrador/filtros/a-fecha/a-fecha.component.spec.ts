import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFechaComponent } from './a-fecha.component';

describe('AFechaComponent', () => {
  let component: AFechaComponent;
  let fixture: ComponentFixture<AFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AFechaComponent]
    });
    fixture = TestBed.createComponent(AFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
