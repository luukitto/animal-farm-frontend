import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { PigStatusComponent } from "../pig-status/pig-status.component";
import { Status } from "../../models/pig.model";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatMiniFabButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort, MatSortHeader, Sort } from "@angular/material/sort";
import { MatInput } from "@angular/material/input";
import { GeorgianPaginatorIntl } from "../../localization/georgian-paginator.intl";
import * as AnimalActions from '../../store/animal/animal.actions';
import { selectAllAnimals, selectAnimalsMeta, selectLoading } from '../../store/animal/animal.selector';
import { Store } from "@ngrx/store";
import * as PigStatusActions from '../../store/pig/pig.actions';
import { MatBadge } from "@angular/material/badge";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    CommonModule,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
    MatColumnDef,
    MatMiniFabButton,
    MatHeaderRowDef,
    MatRowDef,
    MatLabel,
    MatSortHeader,
    MatHeaderCellDef,
    MatCellDef,
    MatFormField,
    MatPaginator,
    MatInput,
    MatSort,
    MatBadge
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: GeorgianPaginatorIntl}
  ],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<string>();
  currentSearch = '';
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';

  displayedColumns: string[] = ['name', 'type', 'arkipoCounter', 'actions'];
  dataSource: Animal[] = [];
  loading$ = this.store.select(selectLoading);
  meta$ = this.store.select(selectAnimalsMeta);

  @Input() pigStatusRef!: PigStatusComponent;

  constructor(
    private animalService: AnimalService,
    private store: Store) {
    this.store.select(selectAllAnimals)
      .pipe(takeUntil(this.destroy$))
      .subscribe(animals => {
        this.dataSource = animals;
      });
  }

  ngOnInit() {
    this.loadAnimals(1);

    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(filterValue => {
      this.currentSearch = filterValue;
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.loadAnimals(1);
    });
  }

  ngAfterViewInit() {
  }

  onSort(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.currentSortBy = undefined;
      this.currentSortOrder = undefined;
    } else {
      if (this.currentSortBy === sort.active) {
        this.currentSortOrder = this.currentSortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
        this.currentSortBy = sort.active;
        this.currentSortOrder = 'ASC';
      }
    }

    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }

    this.loadAnimals(1);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(page: number) {
    this.loadAnimals(page);
  }

  loadAnimals(page: number = 1) {
    const params: any = { page };

    if (this.currentSearch) {
      params.search = this.currentSearch;
    }

    if (this.currentSortBy && this.currentSortOrder) {
      params.sortBy = this.currentSortBy;
      params.sortOrder = this.currentSortOrder;
    }

    this.store.dispatch(AnimalActions.loadAnimals(params));
  }

  feedAnimal(id: number) {
    this.store.dispatch(AnimalActions.feedAnimal({ id }));
    this.store.dispatch(PigStatusActions.updatePigStatus({ newStatus: Status.HAPPY }));
    setTimeout(() => {
      this.store.dispatch(PigStatusActions.updatePigStatus({ newStatus: Status.DEFAULT }));
    }, 3000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue.trim());
  }
}
