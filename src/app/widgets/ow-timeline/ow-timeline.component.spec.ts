import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwTimelineComponent } from './ow-timeline.component';

describe('OwTimelineComponent', () => {
  let component: OwTimelineComponent;
  let fixture: ComponentFixture<OwTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
