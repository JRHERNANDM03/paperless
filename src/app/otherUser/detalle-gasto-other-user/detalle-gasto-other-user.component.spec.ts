import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGastoOtherUserComponent } from './detalle-gasto-other-user.component';

describe('DetalleGastoOtherUserComponent', () => {
  let component: DetalleGastoOtherUserComponent;
  let fixture: ComponentFixture<DetalleGastoOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleGastoOtherUserComponent]
    });
    fixture = TestBed.createComponent(DetalleGastoOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
