import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryVisitsHistoryComponent } from './nurse-infirmary-visits-history.component';

describe('NurseInfirmaryVisitsHistoryComponent', () => {
  let component: NurseInfirmaryVisitsHistoryComponent;
  let fixture: ComponentFixture<NurseInfirmaryVisitsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryVisitsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryVisitsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
