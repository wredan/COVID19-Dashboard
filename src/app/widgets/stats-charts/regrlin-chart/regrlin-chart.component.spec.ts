import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrlinChartComponent } from './regrlin-chart.component';

describe('RegrlinChartComponent', () => {
  let component: RegrlinChartComponent;
  let fixture: ComponentFixture<RegrlinChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrlinChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrlinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
