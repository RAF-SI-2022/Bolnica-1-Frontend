import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditEmployeeComponent } from './admin-edit-employee.component';

describe('AdminEditEmployeeComponent', () => {
  let component: AdminEditEmployeeComponent;
  let fixture: ComponentFixture<AdminEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
