import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwimComponent } from './swim.component';

describe('SwimComponent', () => {
  let component: SwimComponent;
  let fixture: ComponentFixture<SwimComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
