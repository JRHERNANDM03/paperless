import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastoAdministradorComponent } from './editar-gasto-administrador.component';

describe('EditarGastoAdministradorComponent', () => {
  let component: EditarGastoAdministradorComponent;
  let fixture: ComponentFixture<EditarGastoAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGastoAdministradorComponent]
    });
    fixture = TestBed.createComponent(EditarGastoAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
