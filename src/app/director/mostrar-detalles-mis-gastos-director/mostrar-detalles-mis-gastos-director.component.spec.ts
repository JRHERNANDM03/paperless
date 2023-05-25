import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetallesMisGastosDirectorComponent } from './mostrar-detalles-mis-gastos-director.component';

describe('MostrarDetallesMisGastosDirectorComponent', () => {
  let component: MostrarDetallesMisGastosDirectorComponent;
  let fixture: ComponentFixture<MostrarDetallesMisGastosDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarDetallesMisGastosDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarDetallesMisGastosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
