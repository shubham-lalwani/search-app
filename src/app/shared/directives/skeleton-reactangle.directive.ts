import {
  Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { DummyRectangleComponent } from '../component/dummy-rectangle/dummy-rectangle.component';

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Directive({
  selector: '[appSkeletonReactangle]',
  standalone: true
})
export class SkeletonReactangleDirective {
  @Input('appSkeletonReactangle') isLoading = false;
  @Input('appSkeletonReactangleRepeat') size = 1;
  @Input('appSkeletonReactangleWidth') width: string = '';
  @Input('appSkeletonReactangleHeight') height: string = '';
  @Input('appSkeletonReactangleClassName') className: string ='';

  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      this.vcr.clear();

      if (changes['isLoading'].currentValue) {
        Array.from({ length: this.size }).forEach(() => {
          const ref = this.vcr.createComponent(DummyRectangleComponent);

          Object.assign(ref.instance, {
            width: this.width === 'rand' ? `${random(30, 90)}%` : this.width,
            height: this.height,
            className: this.className,
          });
        });
      } else {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }

}
