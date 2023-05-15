import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesGastoComponent } from './detalles-gasto.component';

describe('DetallesGastoComponent', () => {
  let component: DetallesGastoComponent;
  let fixture: ComponentFixture<DetallesGastoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesGastoComponent]
    });
    fixture = TestBed.createComponent(DetallesGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
