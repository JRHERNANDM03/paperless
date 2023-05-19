import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherNumeroViajeComponent } from './other-numero-viaje.component';

describe('OtherNumeroViajeComponent', () => {
  let component: OtherNumeroViajeComponent;
  let fixture: ComponentFixture<OtherNumeroViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherNumeroViajeComponent]
    });
    fixture = TestBed.createComponent(OtherNumeroViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
