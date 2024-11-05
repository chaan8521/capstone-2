import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('topbarMenu') topbarMenu!: ElementRef;

  items!: MenuItem[];
  hide: boolean = true;
  dateToday: any = new Date();

  onMenuButtonClick(event: Event) {
    this.hide = !this.hide;
    this.menuButtonClick.emit();
    event.preventDefault();
  }
}
