import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastoDirectorComponent } from './editar-gasto-director.component';

describe('EditarGastoDirectorComponent', () => {
  let component: EditarGastoDirectorComponent;
  let fixture: ComponentFixture<EditarGastoDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGastoDirectorComponent]
    });
    fixture = TestBed.createComponent(EditarGastoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
