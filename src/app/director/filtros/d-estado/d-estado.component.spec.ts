import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DEstadoComponent } from './d-estado.component';

describe('DEstadoComponent', () => {
  let component: DEstadoComponent;
  let fixture: ComponentFixture<DEstadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DEstadoComponent]
    });
    fixture = TestBed.createComponent(DEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
