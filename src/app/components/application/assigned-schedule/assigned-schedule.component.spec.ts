import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedScheduleComponent } from './assigned-schedule.component';

describe('AssignedScheduleComponent', () => {
  let component: AssignedScheduleComponent;
  let fixture: ComponentFixture<AssignedScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
