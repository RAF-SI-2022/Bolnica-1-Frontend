import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistSearchComponent } from './biochemist-search.component';

describe('BiochemistSearchComponent', () => {
  let component: BiochemistSearchComponent;
  let fixture: ComponentFixture<BiochemistSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiochemistSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochemistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
