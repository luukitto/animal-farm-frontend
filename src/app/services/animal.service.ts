import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal, Animals } from "../models/animal.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'api/animals'


  constructor(private http: HttpClient) { }

  getAnimals(page: number , limit: number ): Observable<Animals> {
    return this.http.get<Animals>(`/api/animals?page=${page}&limit=${limit}`);
  }

  feedAnimal(id: number): Observable<Animal>{
    return this.http.post<Animal>(`${this.apiUrl}/${id}/feed`, {})
  }
}
