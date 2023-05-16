import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetallesGastosAdministradorComponent } from './mostrar-detalles-gastos-administrador.component';

describe('MostrarDetallesGastosAdministradorComponent', () => {
  let component: MostrarDetallesGastosAdministradorComponent;
  let fixture: ComponentFixture<MostrarDetallesGastosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarDetallesGastosAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarDetallesGastosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
