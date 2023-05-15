import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarViajeComponent } from './mostrar-viaje.component';

describe('MostrarViajeComponent', () => {
  let component: MostrarViajeComponent;
  let fixture: ComponentFixture<MostrarViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarViajeComponent]
    });
    fixture = TestBed.createComponent(MostrarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
