import { Component, Input, OnInit } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal.model";
import { NgForOf, NgIf } from "@angular/common";
import { PigStatusComponent } from "../pig-status/pig-status.component";
import { Status } from "../../models/pig.model";

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
  @Input() pigStatusRef!: PigStatusComponent;

  constructor(
    private animalService: AnimalService) {
  }

  ngOnInit() {
    this.getAnimals()
  }

  feedAnimal(id: number) {
    this.loading = true;
    this.error = null;

    this.animalService.feedAnimal(id).subscribe({
      next: (data) => {
        // Update Animal
        const fedAnimal = data
        const index = this.animals.findIndex(animal => animal.id === fedAnimal.id);
        if (index !== -1) {
          this.animals[index] = fedAnimal;
        }

        // Update PigStatus to HAPPY
        this.pigStatusRef.updatePigStatus(Status.HAPPY);

        // Update PigStatus to DEFAULT after 3 seconds
        setTimeout(() => {
          this.pigStatusRef.updatePigStatus(Status.DEFAULT);
        }, 3000);
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
