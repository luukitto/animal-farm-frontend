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

  getAnimals(): Observable<Animal> {
    return this.http.get<Animal>(this.apiUrl)
  }

  updateAnimals(id: number, arkipoCounter: number): Observable<Animal>{
    const payload = {
      id: id,
      arkipoCounter: arkipoCounter
    }
    return this.http.post<Animal>(this.apiUrl, payload)
  }
}
