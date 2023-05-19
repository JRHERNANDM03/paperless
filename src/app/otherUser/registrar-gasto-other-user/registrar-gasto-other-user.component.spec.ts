import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoOtherUserComponent } from './registrar-gasto-other-user.component';

describe('RegistrarGastoOtherUserComponent', () => {
  let component: RegistrarGastoOtherUserComponent;
  let fixture: ComponentFixture<RegistrarGastoOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarGastoOtherUserComponent]
    });
    fixture = TestBed.createComponent(RegistrarGastoOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
