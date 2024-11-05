import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSystemComponent } from './system-table.component';

describe('TableSystemComponent', () => {
  let component: TableSystemComponent;
  let fixture: ComponentFixture<TableSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
