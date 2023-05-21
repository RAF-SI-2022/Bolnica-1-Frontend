import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfirmaryStateHistoryComponent } from './nurse-infirmary-state-history.component';

describe('NurseInfirmaryStateHistoryComponent', () => {
  let component: NurseInfirmaryStateHistoryComponent;
  let fixture: ComponentFixture<NurseInfirmaryStateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseInfirmaryStateHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseInfirmaryStateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
