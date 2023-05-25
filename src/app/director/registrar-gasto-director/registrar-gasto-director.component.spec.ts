import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoDirectorComponent } from './registrar-gasto-director.component';

describe('RegistrarGastoDirectorComponent', () => {
  let component: RegistrarGastoDirectorComponent;
  let fixture: ComponentFixture<RegistrarGastoDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarGastoDirectorComponent]
    });
    fixture = TestBed.createComponent(RegistrarGastoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
