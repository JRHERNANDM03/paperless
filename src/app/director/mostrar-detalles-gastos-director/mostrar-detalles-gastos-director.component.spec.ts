import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetallesGastosDirectorComponent } from './mostrar-detalles-gastos-director.component';

describe('MostrarDetallesGastosDirectorComponent', () => {
  let component: MostrarDetallesGastosDirectorComponent;
  let fixture: ComponentFixture<MostrarDetallesGastosDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarDetallesGastosDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarDetallesGastosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
