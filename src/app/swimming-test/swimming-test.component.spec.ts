import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmingTestComponent } from './swimming-test.component';

describe('SwimmingTestComponent', () => {
  let component: SwimmingTestComponent;
  let fixture: ComponentFixture<SwimmingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimmingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimmingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
