import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessErrorComponent } from './access-error.component';

describe('AccessErrorComponent', () => {
  let component: AccessErrorComponent;
  let fixture: ComponentFixture<AccessErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessErrorComponent]
    });
    fixture = TestBed.createComponent(AccessErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
