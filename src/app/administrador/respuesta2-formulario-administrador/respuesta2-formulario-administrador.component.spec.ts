import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Respuesta2FormularioAdministradorComponent } from './respuesta2-formulario-administrador.component';

describe('Respuesta2FormularioAdministradorComponent', () => {
  let component: Respuesta2FormularioAdministradorComponent;
  let fixture: ComponentFixture<Respuesta2FormularioAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Respuesta2FormularioAdministradorComponent]
    });
    fixture = TestBed.createComponent(Respuesta2FormularioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
