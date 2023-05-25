import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesHomeComponent } from './pendientes-home.component';

describe('PendientesHomeComponent', () => {
  let component: PendientesHomeComponent;
  let fixture: ComponentFixture<PendientesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendientesHomeComponent]
    });
    fixture = TestBed.createComponent(PendientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
