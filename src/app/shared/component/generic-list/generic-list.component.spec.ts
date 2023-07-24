import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerictListComponent } from './generic-list.component';

describe('ListComponent', () => {
  let component: GenerictListComponent<any>;
  let fixture: ComponentFixture<GenerictListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GenerictListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerictListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListComponent', () => {
    expect(component).toBeTruthy();
  });
});
