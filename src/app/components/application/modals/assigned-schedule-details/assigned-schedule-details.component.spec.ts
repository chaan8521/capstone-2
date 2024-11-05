import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedScheduleDetailsComponent } from './assigned-schedule-details.component';

describe('AssignedScheduleDetailsComponent', () => {
  let component: AssignedScheduleDetailsComponent;
  let fixture: ComponentFixture<AssignedScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedScheduleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
