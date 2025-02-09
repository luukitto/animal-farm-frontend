import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../models/animal.model";
import { PigStatus } from "../models/pig.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'api/animals'


  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl)
  }

  updateAnimals(id: number): Observable<{animal: Animal, pigStatus: PigStatus}>{
    return this.http.post<{animal: Animal, pigStatus: PigStatus}>(`${this.apiUrl}/${id}/feed`, {})
  }
}
