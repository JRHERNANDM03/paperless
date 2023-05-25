import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMisviajesAdministradorComponent } from './mostrar-misviajes-administrador.component';

describe('MostrarMisviajesAdministradorComponent', () => {
  let component: MostrarMisviajesAdministradorComponent;
  let fixture: ComponentFixture<MostrarMisviajesAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarMisviajesAdministradorComponent]
    });
    fixture = TestBed.createComponent(MostrarMisviajesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
