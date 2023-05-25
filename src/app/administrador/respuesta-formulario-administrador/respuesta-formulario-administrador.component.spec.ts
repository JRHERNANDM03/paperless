import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaFormularioAdministradorComponent } from './respuesta-formulario-administrador.component';

describe('RespuestaFormularioAdministradorComponent', () => {
  let component: RespuestaFormularioAdministradorComponent;
  let fixture: ComponentFixture<RespuestaFormularioAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespuestaFormularioAdministradorComponent]
    });
    fixture = TestBed.createComponent(RespuestaFormularioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
