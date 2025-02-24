import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../models/animal.model";
import { PaginatedResponse } from '../models/paginated-response.model';
   

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'api/animals';

  constructor(private http: HttpClient) { }

  feedAnimal(id: number): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}/${id}/feed`, {});
  }

  getAllAnimals(
    page: number = 1, 
    search: string = '',
    sortBy?: string,
    sortOrder?: 'ASC' | 'DESC'
  ): Observable<PaginatedResponse<Animal>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', '10');
    
    if (search) {
      params = params.set('search', search);
    }
    
    if (sortBy && sortOrder) {
      params = params.set('sortBy', sortBy)
                    .set('sortOrder', sortOrder);
    }
    
    return this.http.get<PaginatedResponse<Animal>>(this.apiUrl, { params });
  }
}
