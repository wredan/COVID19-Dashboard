import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeffPearsonChartComponent } from './coeff-pearson-chart.component';

describe('CoeffPearsonChartComponent', () => {
  let component: CoeffPearsonChartComponent;
  let fixture: ComponentFixture<CoeffPearsonChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeffPearsonChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeffPearsonChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
