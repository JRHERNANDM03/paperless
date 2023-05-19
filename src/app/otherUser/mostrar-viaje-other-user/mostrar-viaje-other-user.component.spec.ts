import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarViajeOtherUserComponent } from './mostrar-viaje-other-user.component';

describe('MostrarViajeOtherUserComponent', () => {
  let component: MostrarViajeOtherUserComponent;
  let fixture: ComponentFixture<MostrarViajeOtherUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarViajeOtherUserComponent]
    });
    fixture = TestBed.createComponent(MostrarViajeOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
