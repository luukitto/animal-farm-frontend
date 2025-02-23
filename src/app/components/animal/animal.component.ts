import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatMiniFabButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatInput } from "@angular/material/input";
import { GeorgianPaginatorIntl } from "../../localization/georgian-paginator.intl";
import * as AnimalActions from '../../store/animal/animal.actions';
import { selectAllAnimals, selectAnimalsMeta, selectLoading } from '../../store/animal/animal.selector';
import { Store } from "@ngrx/store";
import * as PigStatusActions from '../../store/pig/pig.actions';
import { MatBadge } from "@angular/material/badge";

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
export class AnimalComponent implements OnInit, AfterViewInit {
  animals$ = this.store.select(selectAllAnimals);
  meta$ = this.store.select(selectAnimalsMeta);
  loading$ = this.store.select(selectLoading);

  @Input() pigStatusRef!: PigStatusComponent;
  displayedColumns: string[] = ['name', 'type', 'arkipoCounter', 'actions'];
  dataSource = new MatTableDataSource<Animal>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private animalService: AnimalService,
    private store: Store) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.loadAnimals()
    this.animals$.subscribe(animals => {
      this.dataSource.data = animals;
    });

  }


  onPageChange(page: number) {
    this.store.dispatch(AnimalActions.loadAnimals({ page }));
  }

  loadAnimals(page: number = 1) {
    this.store.dispatch(AnimalActions.loadAnimals({ page }));
  }



  feedAnimal(id: number) {
    this.store.dispatch(AnimalActions.feedAnimal({ id }));
    this.store.dispatch(PigStatusActions.updatePigStatus({ newStatus: Status.HAPPY }));
    setTimeout(() => {
      this.store.dispatch(PigStatusActions.updatePigStatus({ newStatus: Status.DEFAULT }));
    }, 3000);
  }

}
