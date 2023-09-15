import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFileOtherUserComponent } from './editar-file-other-user.component';

describe('EditarFileOtherUserComponent', () => {
  let component: EditarFileOtherUserComponent;
  let fixture: ComponentFixture<EditarFileOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarFileOtherUserComponent]
    });
    fixture = TestBed.createComponent(EditarFileOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
