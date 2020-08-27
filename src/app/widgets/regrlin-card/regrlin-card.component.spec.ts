import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrlinCardComponent } from './regrlin-card.component';

describe('RegrlinCardComponent', () => {
  let component: RegrlinCardComponent;
  let fixture: ComponentFixture<RegrlinCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrlinCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrlinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
