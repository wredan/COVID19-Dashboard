import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtryTimelineComponent } from './ctry-timeline.component';

describe('CtryTimelineComponent', () => {
  let component: CtryTimelineComponent;
  let fixture: ComponentFixture<CtryTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtryTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
