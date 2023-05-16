import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarViajeAdministradorComponent } from './mostrar-viaje-administrador.component';

describe('MostrarViajeAdministradorComponent', () => {
  let component: MostrarViajeAdministradorComponent;
  let fixture: ComponentFixture<MostrarViajeAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarViajeAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarViajeAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
