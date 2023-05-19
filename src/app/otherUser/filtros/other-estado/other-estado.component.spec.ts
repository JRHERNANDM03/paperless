import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEstadoComponent } from './other-estado.component';

describe('OtherEstadoComponent', () => {
  let component: OtherEstadoComponent;
  let fixture: ComponentFixture<OtherEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherEstadoComponent]
    });
    fixture = TestBed.createComponent(OtherEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
