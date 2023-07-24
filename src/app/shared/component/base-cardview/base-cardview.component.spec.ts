import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardviewComponent } from './base-cardview.component';
import { User } from '../../interface/user.interface';

describe('BaseCardviewComponent', () => {
  let component: BaseCardviewComponent<User>;
  let fixture: ComponentFixture<BaseCardviewComponent<User>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BaseCardviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCardviewComponent<User>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BaseCardviewComponent', () => {
    expect(component).toBeTruthy();
  });
});
