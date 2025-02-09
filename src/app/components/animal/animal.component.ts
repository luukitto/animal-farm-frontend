import { Component, OnInit } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent implements OnInit {
  animals: Animal[] = [];
  loading = false;
  error: string | null = null;

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.getAnimals()
  }

  getAnimals(): void {
    this.loading = true;
    this.error = null;

    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = [data];
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
