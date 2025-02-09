import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PigStatus } from "../models/pig.model";

@Injectable({
  providedIn: 'root'
})
export class PigService {
  private apiUrl = 'api/bidzina/status'

  constructor(private http: HttpClient) { }

  getStatus(): Observable<PigStatus> {
    return this.http.get<PigStatus>(this.apiUrl)
  }

  updateStatus(status: string): Observable<PigStatus> {
    const payload = {
      id: 1,
      status: status
    }
    return this.http.post<PigStatus>(this.apiUrl, payload)
  }
}
