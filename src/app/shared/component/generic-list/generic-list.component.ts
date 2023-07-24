import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interface/country.interface'
import { Payment } from '../../interface/payment.interface'
import { User } from '../../interface/user.interface'
import { MatListModule } from '@angular/material/list'
import { AsPipe } from '../../pipes/as.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActiveList } from '../../interface/active-list.interface';
import { FallbackSrcDirective } from '../../directives/fallback-src.directive';
import { PaymentUiForm } from '../../interface/payment-uiForm.interface';

type ListTypes = Country | Payment | User | PaymentUiForm;

// type guards
const isUser = (user: ListTypes): user is User => {
  return (user as User)?.firstName !== undefined;
}

const isPayment = (payment: ListTypes): payment is Payment => {
  return (payment as Payment)?.status !== undefined;
}

const isCountry = (country: ListTypes): country is Country => {
  return (country as Country)?.name !== undefined;
}

const ispaymentUiForm = (payment: ListTypes): payment is PaymentUiForm => {
  return (payment as PaymentUiForm)?.firstId !== undefined;
}

@Component({
  selector: 'generic-list',
  standalone: true,
  imports: [CommonModule, MatListModule, FallbackSrcDirective, AsPipe, MatCheckboxModule, ScrollingModule],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
  viewProviders: [FallbackSrcDirective],
})
export class GenerictListComponent<T extends ListTypes> {
  @Input() items: T[] = [];
  @Output() selectedItem: EventEmitter<ActiveList> = new EventEmitter<ActiveList>();

  User!: User;
  Payment!: Payment;
  Country!: Country;
  PaymentUiForm!: PaymentUiForm;
  selectedId:string = ''; // current item

  constructor() { }

  /**
   * @param obj of generic type
   * @returns type of object on run time
   */
  getTypeObject(obj: ListTypes) {
    if (isUser(obj)) return "user";
    if (ispaymentUiForm(obj)) return "paymentUiForm"
    if (isPayment(obj)) return "payment";
    if (isCountry(obj)) return "country";
    return '';
  }

  /**
   * @param listType data type of list for router
   * @param id selected id from list
   * common functionality for slection
   */
  selectItem(listType:string, id:string) {
    this.selectedId =id;
    this.selectedItem.emit({routeTo: listType, id: id});
  }
}
