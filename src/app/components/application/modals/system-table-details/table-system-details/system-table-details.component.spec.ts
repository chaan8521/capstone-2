import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSystemDetailsComponent } from './system-table-details.component';

describe('TableSystemDetailsComponent', () => {
  let component: TableSystemDetailsComponent;
  let fixture: ComponentFixture<TableSystemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSystemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
