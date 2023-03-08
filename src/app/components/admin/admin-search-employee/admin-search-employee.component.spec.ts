import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSearchEmployeeComponent } from './admin-search-employee.component';

describe('AdminSearchEmployeeComponent', () => {
  let component: AdminSearchEmployeeComponent;
  let fixture: ComponentFixture<AdminSearchEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSearchEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSearchEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
