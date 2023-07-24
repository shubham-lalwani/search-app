import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyRectangleComponent } from './dummy-rectangle.component';

describe('DummyRectangleComponent', () => {
  let component: DummyRectangleComponent;
  let fixture: ComponentFixture<DummyRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DummyRectangleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DummyRectangleComponent', () => {
    expect(component).toBeTruthy();
  });
});
