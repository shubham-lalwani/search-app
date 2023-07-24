import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Country } from '../../interface/country.interface';
import { Payment } from '../../interface/payment.interface';
import { User } from '../../interface/user.interface';
import { GenerictListComponent } from '../generic-list/generic-list.component';
import { SkeletonReactangleDirective } from '../../directives/skeleton-reactangle.directive';
import { ActiveList } from '../../interface/active-list.interface';
import { FilterPipe } from '../../pipes/filter.pipe';
import { PaymentUiForm } from '../../interface/payment-uiForm.interface';

type ListTypes = Country | Payment | User | PaymentUiForm;

@Component({
  selector: 'app-base-cardview',
  standalone: true,
  imports: [CommonModule, FormsModule, GenerictListComponent, MatCardModule,
    SkeletonReactangleDirective, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatProgressSpinnerModule, FilterPipe],
  viewProviders: [SkeletonReactangleDirective],
  templateUrl: './base-cardview.component.html',
  styleUrls: ['./base-cardview.component.scss']
})
export class BaseCardviewComponent<T extends ListTypes> {

  @Input() cardTitle: string = '';
  @Input() searchLabel: string = '';
  @Input() dataList: T[] = [];
  @Input() loadingDataList: boolean = false;
  @Output() continueBtnClick: EventEmitter<ActiveList> = new EventEmitter<ActiveList>();

  searchTxt: string = '';
  selectedListITem: ActiveList = <ActiveList>{};

  /**
   * @param currentItem of type ActiveList
   * sets the current item
   */
  currentSelectedItem(currentItem: ActiveList) {
    this.selectedListITem = currentItem;
  }

  /**
   * navigates the user to selected list
   */
  navToSelectedItem() {
    this.continueBtnClick.emit(this.selectedListITem);
  }

}
