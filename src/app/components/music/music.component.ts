import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AudioService } from "../../services/music.service";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { Status } from "../../models/pig.model";

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  @Input() status!: Status;

  constructor(
    private http: HttpClient,
    public audioService: AudioService
  ) {}

  toggleAudio() {
    this.http.post<string>('api/music/toggle', { status: this.status })
      .subscribe(audioPath => {
        console.log("AUDIO PATH: ", audioPath);
        this.audioService.loadAndToggle(audioPath);
      });
  }
}
