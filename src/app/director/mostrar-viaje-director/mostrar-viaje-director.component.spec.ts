import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarViajeDirectorComponent } from './mostrar-viaje-director.component';

describe('MostrarViajeDirectorComponent', () => {
  let component: MostrarViajeDirectorComponent;
  let fixture: ComponentFixture<MostrarViajeDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarViajeDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarViajeDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
