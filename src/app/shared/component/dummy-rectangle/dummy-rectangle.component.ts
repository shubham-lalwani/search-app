import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dummy-rectangle',
  standalone: true,
  host: {
    class: 'pulse',
  },
  imports: [CommonModule],
  templateUrl: './dummy-rectangle.component.html',
  styleUrls: ['./dummy-rectangle.component.scss']
})
export class DummyRectangleComponent {
  width: string ='';
  height: string ='';
  className: string ='';

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
    host.style.setProperty('--skeleton-rect-height', this.height ?? '20px');
  }
}
