import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclingTestComponent } from './cycling-test.component';

describe('CyclingTestComponent', () => {
  let component: CyclingTestComponent;
  let fixture: ComponentFixture<CyclingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
