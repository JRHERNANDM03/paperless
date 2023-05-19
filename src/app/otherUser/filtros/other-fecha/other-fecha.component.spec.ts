import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFechaComponent } from './other-fecha.component';

describe('OtherFechaComponent', () => {
  let component: OtherFechaComponent;
  let fixture: ComponentFixture<OtherFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherFechaComponent]
    });
    fixture = TestBed.createComponent(OtherFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
