import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetallesMisGastosAdministradorComponent } from './mostrar-detalles-mis-gastos-administrador.component';

describe('MostrarDetallesMisGastosAdministradorComponent', () => {
  let component: MostrarDetallesMisGastosAdministradorComponent;
  let fixture: ComponentFixture<MostrarDetallesMisGastosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarDetallesMisGastosAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarDetallesMisGastosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
