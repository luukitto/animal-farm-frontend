import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MusicComponent } from '../music/music.component';
import { PigStatus, Status } from '../../models/pig.model';
import * as PigStatusActions from '../../store/pig/pig.actions';
import { selectPigStatus, selectPigLoading,selectPigError } from '../../store/pig/pig.selector';
import { PigStatusState } from '../../store/pig/pig.reducer';
import { AudioService } from "../../services/music.service";

@Component({
  selector: 'app-pig-status',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MusicComponent
  ],
  templateUrl: './pig-status.component.html',
  styleUrls: ['./pig-status.component.css']
})
export class PigStatusComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  pigStatus$: Observable<PigStatus | null>;
  readonly Status = Status;

  constructor(private store: Store<{ pigStatus: PigStatusState }>, private audioService: AudioService) {
    this.loading$ = this.store.select(selectPigLoading);
    this.error$ = this.store.select(selectPigError);
    this.pigStatus$ = this.store.select(selectPigStatus);
  }

  ngOnInit() {
    this.store.dispatch(PigStatusActions.loadPigStatus());
  }

  updatePigStatus(currentStatus: Status): void {
    let nextStatus: Status;

    switch (currentStatus) {
      case Status.DEFAULT:
        nextStatus = Status.PUTIN;
        this.audioService.stop();
        break;
      case Status.PUTIN:
        nextStatus = Status.DEFAULT;
        this.audioService.stop();
        break;
      case Status.HAPPY:
        nextStatus = Status.DEFAULT;
        break;
      default:
        nextStatus = Status.DEFAULT;
    }

    this.store.dispatch(PigStatusActions.updatePigStatus({ newStatus: nextStatus }));
  }


}
