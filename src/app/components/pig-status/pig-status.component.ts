import { Component, OnInit } from '@angular/core';
import { PigService } from "../../services/pig.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { PigStatus, Status } from "../../models/pig.model";

@Component({
  selector: 'app-pig-status',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './pig-status.component.html',
  styleUrl: './pig-status.component.css'
})
export class PigStatusComponent implements OnInit{
  loading = false;
  error: string | null = null;
  pigStatus: PigStatus | null = null;
  status: string = 'default'

  constructor(private pigService: PigService) {
  }

  ngOnInit() {
    this.getPigStatus()
  }

  getPigStatus() {
    this.loading = true;
    this.error = null;

    this.pigService.getStatus().subscribe({
      next: (resp) => {
        this.pigStatus = resp;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to get status';
        this.loading = false
        console.error("Error getting status:", error);
      }
    })
  }

  updatePigStatus(newStatus: string): void {
    this.status = newStatus
    this.loading = true;
    this.error = null;

    this.pigService.updateStatus(newStatus).subscribe({
      next: (data) => {
        this.pigStatus = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to update pig status. Please try again.';
        this.loading = false;
        console.error('Error updating status:', error);
      }
    });
  }
  protected readonly Status = Status
}
