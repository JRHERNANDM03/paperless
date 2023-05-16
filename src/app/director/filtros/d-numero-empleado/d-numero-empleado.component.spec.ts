import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DNumeroEmpleadoComponent } from './d-numero-empleado.component';

describe('DNumeroEmpleadoComponent', () => {
  let component: DNumeroEmpleadoComponent;
  let fixture: ComponentFixture<DNumeroEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DNumeroEmpleadoComponent]
    });
    fixture = TestBed.createComponent(DNumeroEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
