import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../models/animal.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'api/animals'


  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl)
  }

  feedAnimal(id: number): Observable<Animal>{
    return this.http.post<Animal>(`${this.apiUrl}/${id}/feed`, {})
  }
}
