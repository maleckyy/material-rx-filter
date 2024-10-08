import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { AsyncPipe } from '@angular/common';
import { debounceTime, map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table-w-filters',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatFormFieldModule, MatInputModule, AsyncPipe, MatCardModule],
  templateUrl: './table-w-filters.component.html',
  styleUrl: './table-w-filters.component.scss',
  providers: [RxState],
})

export class TableWFiltersComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  readonly ELEMENT_DATA = ELEMENT_DATA;
  delay_time = 2000;
  state = new RxState<{ filter: string, filteredData: PeriodicElement[] }>();

  constructor() {
    this.state.set({ filter: '', filteredData: ELEMENT_DATA });

    this.state.connect(
      'filteredData',
      this.state.select('filter').pipe(
        debounceTime(this.delay_time),
        map(filterValue => this.applyFilter(filterValue))
      )
    );
  }

  onFilterChange(filterValue: Event) {
    const inputValue = (filterValue.target as HTMLInputElement).value;
    this.state.set({ filter: inputValue });
  }

  private applyFilter(filterValue: string): PeriodicElement[] {
    const filterValueLower = filterValue.toLowerCase();
    return this.ELEMENT_DATA.filter(element =>
      element.name.toLowerCase().includes(filterValueLower) ||
      element.symbol.toLowerCase().includes(filterValueLower) ||
      element.position.toString().includes(filterValueLower) ||
      element.weight.toString().includes(filterValueLower)
    );
  }
}
