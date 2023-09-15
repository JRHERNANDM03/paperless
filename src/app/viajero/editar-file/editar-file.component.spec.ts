import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFileComponent } from './editar-file.component';

describe('EditarFileComponent', () => {
  let component: EditarFileComponent;
  let fixture: ComponentFixture<EditarFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFileComponent]
    });
    fixture = TestBed.createComponent(EditarFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
