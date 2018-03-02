import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTestComponent } from './running-test.component';

describe('RunningTestComponent', () => {
  let component: RunningTestComponent;
  let fixture: ComponentFixture<RunningTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
