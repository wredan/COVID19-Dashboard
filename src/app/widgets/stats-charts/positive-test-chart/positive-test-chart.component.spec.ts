import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveTestChartComponent } from './positive-test-chart.component';

describe('PositiveTestChartComponent', () => {
  let component: PositiveTestChartComponent;
  let fixture: ComponentFixture<PositiveTestChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveTestChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveTestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
