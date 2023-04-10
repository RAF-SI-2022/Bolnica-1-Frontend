import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistDailyWorkOrdersComponent } from './biochemist-daily-work-orders.component';

describe('BiochemistDailyWorkOrdersComponent', () => {
  let component: BiochemistDailyWorkOrdersComponent;
  let fixture: ComponentFixture<BiochemistDailyWorkOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistDailyWorkOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistDailyWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
