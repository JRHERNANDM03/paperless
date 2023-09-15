import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFileAdministradorComponent } from './editar-file-administrador.component';

describe('EditarFileAdministradorComponent', () => {
  let component: EditarFileAdministradorComponent;
  let fixture: ComponentFixture<EditarFileAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFileAdministradorComponent]
    });
    fixture = TestBed.createComponent(EditarFileAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
