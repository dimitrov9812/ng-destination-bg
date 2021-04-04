import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinationNavComponent } from './add-destination-nav.component';

describe('AddDestinationNavComponent', () => {
  let component: AddDestinationNavComponent;
  let fixture: ComponentFixture<AddDestinationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDestinationNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
