import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastoOtherUserComponent } from './editar-gasto-other-user.component';

describe('EditarGastoOtherUserComponent', () => {
  let component: EditarGastoOtherUserComponent;
  let fixture: ComponentFixture<EditarGastoOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGastoOtherUserComponent]
    });
    fixture = TestBed.createComponent(EditarGastoOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
