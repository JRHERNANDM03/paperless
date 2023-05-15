import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroViajeComponent } from './numero-viaje.component';

describe('NumeroViajeComponent', () => {
  let component: NumeroViajeComponent;
  let fixture: ComponentFixture<NumeroViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumeroViajeComponent]
    });
    fixture = TestBed.createComponent(NumeroViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
