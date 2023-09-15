import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFileDirectorComponent } from './editar-file-director.component';

describe('EditarFileDirectorComponent', () => {
  let component: EditarFileDirectorComponent;
  let fixture: ComponentFixture<EditarFileDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFileDirectorComponent]
    });
    fixture = TestBed.createComponent(EditarFileDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
