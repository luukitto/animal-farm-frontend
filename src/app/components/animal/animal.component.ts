import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";
import { NgForOf, NgIf } from "@angular/common";
import { PigStatusComponent } from "../pig-status/pig-status.component";
import { Status } from "../../models/pig.model";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatMiniFabButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatInput } from "@angular/material/input";
import { GeorgianPaginatorIntl } from "../../localization/georgian-paginator.intl";

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
    MatSort
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: GeorgianPaginatorIntl}
  ],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent implements OnInit, AfterViewInit {
  loading = false;
  error: string | null = null;
  @Input() pigStatusRef!: PigStatusComponent;
  displayedColumns: string[] = ['name', 'type', 'arkipoCounter', 'actions'];
  dataSource = new MatTableDataSource<Animal>([]);



  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private animalService: AnimalService) {
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
    this.getAnimals()
  }

  feedAnimal(id: number) {
    this.loading = true;
    this.error = null;

    this.animalService.feedAnimal(id).subscribe({
      next: (data) => {
        const index = this.dataSource.data.findIndex(animal => animal.id === data.id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = data;
          this.dataSource.data = updatedData;
        }

        this.pigStatusRef.updatePigStatus(Status.HAPPY);
        setTimeout(() => {
          this.pigStatusRef.updatePigStatus(Status.DEFAULT);
        }, 3000);
      }
    });
  }

  getAnimals(): void {
    this.loading = true;
    this.error = null;

    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.dataSource.data = data
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to get animals. Please try again.';
        this.loading = false;
        console.error('Error getting animals:', error);
      }
    })
  }

}
