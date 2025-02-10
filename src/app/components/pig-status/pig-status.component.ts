import { Component, OnInit } from '@angular/core';
import { PigService } from "../../services/pig.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { PigStatus, Status } from "../../models/pig.model";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCard, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatColumnDef, MatHeaderCell, MatHeaderRow, MatTable } from "@angular/material/table";
import { MatButton } from "@angular/material/button";
import { MusicComponent } from "../music/music.component";
import { AudioService } from "../../services/music.service";

@Component({
  selector: 'app-pig-status',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatProgressSpinner, MatCard, MatCardContent, MatIcon, MatCardHeader, MatTable, MatHeaderCell, MatColumnDef, MatHeaderRow, MatButton, MusicComponent],
  templateUrl: './pig-status.component.html',
  styleUrl: './pig-status.component.css'
})
export class PigStatusComponent implements OnInit{
  loading = false;
  error: string | null = null;
  pigStatus: PigStatus | null = null;
  status: string = 'default'

  constructor(
    private pigService: PigService,
    private audioService: AudioService) {
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
    this.audioService.stop()
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
