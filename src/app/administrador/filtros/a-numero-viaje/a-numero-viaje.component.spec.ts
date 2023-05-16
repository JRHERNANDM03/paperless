import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANumeroViajeComponent } from './a-numero-viaje.component';

describe('ANumeroViajeComponent', () => {
  let component: ANumeroViajeComponent;
  let fixture: ComponentFixture<ANumeroViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ANumeroViajeComponent]
    });
    fixture = TestBed.createComponent(ANumeroViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
