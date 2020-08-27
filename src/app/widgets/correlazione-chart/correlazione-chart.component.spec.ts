import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelazioneChartComponent } from './correlazione-chart.component';

describe('CorrelazioneChartComponent', () => {
  let component: CorrelazioneChartComponent;
  let fixture: ComponentFixture<CorrelazioneChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelazioneChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelazioneChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
