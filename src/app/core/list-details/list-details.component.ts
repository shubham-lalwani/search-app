import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../countries/countries.service';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { ListTypes } from '../../shared/Enum/list-types-enums';
import { User } from 'src/app/shared/interface/user.interface';
import { Payment } from 'src/app/shared/interface/payment.interface';
import { Country } from 'src/app/shared/interface/country.interface';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

type listTypes = User | Payment | Country;

@Component({
  selector: 'app-list-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDividerModule, MatListModule, MatCardModule],
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  providers: [UsersService, PaymentsService, CountriesService],
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  id: string;
  listDetails: string[][] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private countriesService: CountriesService,
    private paymentsService: PaymentsService,
    private usersService: UsersService,
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getItemDetails(this.router.url.split('/')[1])
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * @param listType type of data set
   * return single item details
   */
  getItemDetails(listType: string) {
    switch (listType) {
      case ListTypes.USER:
        this.getUser(this.id);
        break;
      case ListTypes.COUNTRY:
        this.getCountry(this.id);
        break;
      case ListTypes.PAYMENT:
        this.getPayment(this.id);
        break;
    }
  }

  /**
   * Gets a single user from api based on id
   */
  getUser(id: string) {
    this.usersService.getUser(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: User) => {
        this.listDetails = Object.entries(res);
      })
  }

   /**
   * Gets a single country from api based on id
   */
  getCountry(id: string) {
    this.countriesService.getCountry(id)
      .subscribe((res: Country) => {
        this.listDetails = Object.entries(res);
      })
  }

  
   /**
   * Gets a single payment from api based on id
   */
  getPayment(id: string) {
    this.paymentsService.getPayment(id)
      .subscribe((res: Payment) => {
        this.listDetails = Object.entries(res);
      })
  }
}
