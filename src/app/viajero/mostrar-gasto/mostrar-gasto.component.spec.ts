import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGastoComponent } from './mostrar-gasto.component';

describe('MostrarGastoComponent', () => {
  let component: MostrarGastoComponent;
  let fixture: ComponentFixture<MostrarGastoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarGastoComponent]
    });
    fixture = TestBed.createComponent(MostrarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
