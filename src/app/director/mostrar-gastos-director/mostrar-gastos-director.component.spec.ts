import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGastosDirectorComponent } from './mostrar-gastos-director.component';

describe('MostrarGastosDirectorComponent', () => {
  let component: MostrarGastosDirectorComponent;
  let fixture: ComponentFixture<MostrarGastosDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarGastosDirectorComponent]
    });
    fixture = TestBed.createComponent(MostrarGastosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
