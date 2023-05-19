import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGastoOtherUserComponent } from './mostrar-gasto-other-user.component';

describe('MostrarGastoOtherUserComponent', () => {
  let component: MostrarGastoOtherUserComponent;
  let fixture: ComponentFixture<MostrarGastoOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarGastoOtherUserComponent]
    });
    fixture = TestBed.createComponent(MostrarGastoOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
