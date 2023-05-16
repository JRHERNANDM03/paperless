import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFechaComponent } from './d-fecha.component';

describe('DFechaComponent', () => {
  let component: DFechaComponent;
  let fixture: ComponentFixture<DFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DFechaComponent]
    });
    fixture = TestBed.createComponent(DFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
