import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGastosAdministradorComponent } from './mostrar-gastos-administrador.component';

describe('MostrarGastosAdministradorComponent', () => {
  let component: MostrarGastosAdministradorComponent;
  let fixture: ComponentFixture<MostrarGastosAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarGastosAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarGastosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
