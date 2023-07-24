import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

// custom type
type tab = {
  label: string;
  routerLink: string;
};

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnDestroy{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  tabs: tab[] = [
    { label: 'USERS', routerLink: '/users' },
    { label: 'PAYMENTS', routerLink: '/payments' },
    { label: 'COUNTRIES', routerLink: '/countries' }
  ];
  activeLink: string = this.tabs[0].label;

  constructor(private router: Router) {
    // subscribing to the route to set active tab indication
    router.events.pipe(takeUntil(this.destroyed$)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const activeTab = this.tabs.find((tab) => tab.routerLink == this.router.url)
        if(activeTab?.label){
          this.activeLink = activeTab.label;
        }
      }
    });

  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * route to the selected tab
   */
  navigate(tab: tab) {
    this.activeLink = tab.label;
    this.router.navigate([tab.routerLink]);
  }


}
