import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrTestComponent } from './clr-test.component';

describe('ClrTestComponent', () => {
  let component: ClrTestComponent;
  let fixture: ComponentFixture<ClrTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClrTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
