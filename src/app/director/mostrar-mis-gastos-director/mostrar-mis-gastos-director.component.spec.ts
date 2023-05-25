import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMisGastosDirectorComponent } from './mostrar-mis-gastos-director.component';

describe('MostrarMisGastosDirectorComponent', () => {
  let component: MostrarMisGastosDirectorComponent;
  let fixture: ComponentFixture<MostrarMisGastosDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarMisGastosDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarMisGastosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
