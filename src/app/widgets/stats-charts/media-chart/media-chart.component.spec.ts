import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaChartComponent } from './media-chart.component';

describe('MediaChartComponent', () => {
  let component: MediaChartComponent;
  let fixture: ComponentFixture<MediaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
