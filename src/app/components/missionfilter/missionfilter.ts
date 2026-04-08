import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './missionfilter.html',
  styleUrl: './missionfilter.scss',
})
export class MissionfilterComponent {
  @Output() yearFilter = new EventEmitter<string>();
  year = '';

  applyFilter(): void {
    this.yearFilter.emit(this.year.trim());
  }

  clearFilter(): void {
    this.year = '';
    this.yearFilter.emit('');
  }
}
