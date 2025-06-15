import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { KeyOfUnion } from '../../models/tableColumn.type';

export interface TableAction<T> {
  key: TABLE_ACTION_KEY;
  name: string;
  icon?: string;
  color?: string;
  callback: (el?: T) => void;
  availabilityFn: (el?: T) => boolean;
}

export enum TABLE_ACTION_KEY {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

export enum ColumnTypeEnum {
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN'
}

export type TableColumnSettings = { [key: string]: ColumnTypeEnum }

export type ChangesHeaderNames<T> = Partial<Record<KeyOfUnion<T>, string>>;

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  standalone: true,
  imports: [
    MatRadioModule,
    MatTableModule,
    CommonModule,
    MatButtonModule
  ]
})
export class DataGridComponent<T> implements OnInit{

  @Input()
  displayedColumns: string[] = [];

  @Input()
  data: T[] = [];

  @Input()
  changedColumnHeaderNames: { [key: string]: string } = {};

  @Input()
  displayedColumnSettings: { [key: string]: ColumnTypeEnum } = {};

  @Input()
  rowButtonAction!: TableAction<T>[];

  @Input()
  searchKey!: KeyOfUnion<T>;

  selectedRow!: T;
  visibleData: T[] | undefined;
  columnsToDisplay: string[] = [];
  private dataSourceRefreshTrigger$ = new BehaviorSubject(true);

  readonly ColumnTypeEnum = ColumnTypeEnum;


  ngOnInit(): void {

    this.columnsToDisplay = !this.rowButtonAction.length ? this.displayedColumns : ['select', ...this.displayedColumns];
  }

  refresh(){
    this.dataSourceRefreshTrigger$.next(true);
  }

  formatDate(value: Date){
    return formatDate(
      value,
      'd MMM yyyy HH:mm',
      'pl'
    )
  }

  rowClicked(item: T){
    this.selectedRow = item;
  }

  rowButtonActionAvailability(action: TableAction<T> | undefined): boolean {
    if (action?.availabilityFn) {
        return action.availabilityFn(this.selectedRow);
      }
      return false;
  }

}
