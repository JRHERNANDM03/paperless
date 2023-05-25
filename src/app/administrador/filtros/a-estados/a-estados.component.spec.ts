import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEstadosComponent } from './a-estados.component';

describe('AEstadosComponent', () => {
  let component: AEstadosComponent;
  let fixture: ComponentFixture<AEstadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AEstadosComponent]
    });
    fixture = TestBed.createComponent(AEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
