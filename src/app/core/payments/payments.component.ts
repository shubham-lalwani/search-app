import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './payments.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseCardviewComponent } from '../../shared/component/base-cardview/base-cardview.component';
import { Payment } from '../../shared/interface/payment.interface';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ActiveList } from 'src/app/shared/interface/active-list.interface';
import { Router } from '@angular/router';
import { PaymentUiForm } from 'src/app/shared/interface/payment-uiForm.interface';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseCardviewComponent],
  templateUrl: './payments.component.html',
  providers: [PaymentsService],
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  payments: Payment[] = [];
  loading: boolean = false;
  uiFormPayments: PaymentUiForm[] = [];

  constructor(private paymentsService: PaymentsService, private router: Router) { }

  ngOnInit(): void {
    this.getPayments()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

   /**
   * gets the list available list from the api
   */
  getPayments() {
    this.loading=true;
    this.paymentsService.getPayments()
    .pipe(takeUntil(this.destroyed$))
      .subscribe((res: Payment[]) => {
        this.loading=false;
        this.payments = res;
        this.groupPayments(res)
      })
  }

  /**
   * @param currentItem selected item from list
   * route to list details component
   */
  navToSelectedItem(currentItem: ActiveList) {
    const route = '/' + currentItem.routeTo + '/' + currentItem.id;
    this.router.navigate([route]);
  }

  /**
   * @param payments received from api
   * Assumption: since the payments are not group 
   * Grouped them with the type and took the first id
   * sets the new data list with grouped payment 
   */
  groupPayments(payments: Payment[]) {
    const wrongPayslip = payments.filter(payment => payment.status === "wrong_payslip");
    const wrongAddress = payments.filter(payment => payment.status === "wrong_address");
    const deliveryError = payments.filter(payment => payment.status === "delivery_error");
    const declined = payments.filter(payment => payment.status === "declined");
    this.uiFormPayments = [
      {
        status: "Wrong Payslip",
        firstId: wrongPayslip[0].id,
        count: wrongPayslip.length
      },
      {
        status: "Wrong Address",
        firstId: wrongAddress[0].id,
        count: wrongAddress.length
      },      
      {
        status: "Delivery error",
        firstId: deliveryError[0].id,
        count: deliveryError.length
      },      
      {
        status: "Declined",
        firstId: declined[0].id,
        count: declined.length
      }
    ]
  }
}
