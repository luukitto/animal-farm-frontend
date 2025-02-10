import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigStatusComponent } from './pig-status.component';

describe('PigStatusComponent', () => {
  let component: PigStatusComponent;
  let fixture: ComponentFixture<PigStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PigStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
