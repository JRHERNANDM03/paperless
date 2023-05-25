import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMiviajeAdministradorComponent } from './mostrar-miviaje-administrador.component';

describe('MostrarMiviajeAdministradorComponent', () => {
  let component: MostrarMiviajeAdministradorComponent;
  let fixture: ComponentFixture<MostrarMiviajeAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarMiviajeAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarMiviajeAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
