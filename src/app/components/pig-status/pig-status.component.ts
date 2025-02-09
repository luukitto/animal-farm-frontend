import { Component, OnInit } from '@angular/core';
import { PigService } from "../../services/pig.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-pig-status',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './pig-status.component.html',
  styleUrl: './pig-status.component.css'
})
export class PigStatusComponent implements OnInit{

  constructor(private pigService: PigService) {
  }

  ngOnInit() {
    this.getPigStatus()
  }

  getPigStatus() {
    this.pigService.getStatus().subscribe((res) => {
      console.log(res, 'status')
    })
  }
}
