import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEmployeeComponent } from './admin-add-employee.component';

describe('AdminAddEmployeeComponent', () => {
  let component: AdminAddEmployeeComponent;
  let fixture: ComponentFixture<AdminAddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
