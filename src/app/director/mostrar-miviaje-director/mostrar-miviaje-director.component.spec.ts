import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMiviajeDirectorComponent } from './mostrar-miviaje-director.component';

describe('MostrarMiviajeDirectorComponent', () => {
  let component: MostrarMiviajeDirectorComponent;
  let fixture: ComponentFixture<MostrarMiviajeDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarMiviajeDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarMiviajeDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
