import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANumeroEmpleadoComponent } from './a-numero-empleado.component';

describe('ANumeroEmpleadoComponent', () => {
  let component: ANumeroEmpleadoComponent;
  let fixture: ComponentFixture<ANumeroEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ANumeroEmpleadoComponent]
    });
    fixture = TestBed.createComponent(ANumeroEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
