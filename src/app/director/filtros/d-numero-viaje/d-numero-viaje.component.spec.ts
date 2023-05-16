import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DNumeroViajeComponent } from './d-numero-viaje.component';

describe('DNumeroViajeComponent', () => {
  let component: DNumeroViajeComponent;
  let fixture: ComponentFixture<DNumeroViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DNumeroViajeComponent]
    });
    fixture = TestBed.createComponent(DNumeroViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
