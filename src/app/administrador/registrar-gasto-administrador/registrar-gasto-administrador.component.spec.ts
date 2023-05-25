import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoAdministradorComponent } from './registrar-gasto-administrador.component';

describe('RegistrarGastoAdministradorComponent', () => {
  let component: RegistrarGastoAdministradorComponent;
  let fixture: ComponentFixture<RegistrarGastoAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarGastoAdministradorComponent]
    });
    fixture = TestBed.createComponent(RegistrarGastoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
