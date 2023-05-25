import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMisGastosAdministradorComponent } from './mostrar-mis-gastos-administrador.component';

describe('MostrarMisGastosAdministradorComponent', () => {
  let component: MostrarMisGastosAdministradorComponent;
  let fixture: ComponentFixture<MostrarMisGastosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarMisGastosAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarMisGastosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
