import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWFiltersComponent } from './table-w-filters.component';

describe('TableWFiltersComponent', () => {
  let component: TableWFiltersComponent;
  let fixture: ComponentFixture<TableWFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
