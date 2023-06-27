import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistSearchWorkOrdersComponent } from './biochemist-search-work-orders.component';

describe('BiochemistSearchWorkOrdersComponent', () => {
  let component: BiochemistSearchWorkOrdersComponent;
  let fixture: ComponentFixture<BiochemistSearchWorkOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistSearchWorkOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistSearchWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
