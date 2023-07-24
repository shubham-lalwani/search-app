import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from './countries.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseCardviewComponent } from '../../shared/component/base-cardview/base-cardview.component';
import { Country } from '../../shared/interface/country.interface';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ActiveList } from 'src/app/shared/interface/active-list.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseCardviewComponent],
  templateUrl: './countries.component.html',
  providers: [CountriesService],
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  countries: Country[] = [];
  loading: boolean = false;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit(): void {
    this.getCountry()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * gets the list available list from the api
   */
  getCountry() {
    this.loading=true;
    this.countriesService.getCountries()
    .pipe(takeUntil(this.destroyed$))
      .subscribe((res: Country[]) => {
        this.loading=false;
        this.countries = res;
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
}
