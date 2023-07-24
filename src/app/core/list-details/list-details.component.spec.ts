import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailsComponent } from './list-details.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('ListDetailsComponent', () => {
  let component: ListDetailsComponent;
  let fixture: ComponentFixture<ListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListDetailsComponent, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListDetailsComponent', () => {
    expect(component).toBeTruthy();
  });
});
