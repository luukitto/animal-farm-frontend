import { Component, OnInit } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
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

  feedAnimal(id: number) {
    this.loading = true;
    this.error = null;

    this.animalService.updateAnimals(id).subscribe({
      next: (data) => {
        const fedAnimal = data.animal
        const index = this.animals.findIndex(animal => animal.id === fedAnimal.id);
        if (index !== -1) {
          this.animals[index] = fedAnimal;
        }
      }
    })
  }

  getAnimals(): void {
    this.loading = true;
    this.error = null;

    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
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
