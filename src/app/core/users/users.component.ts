import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/interface/user.interface';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseCardviewComponent } from '../../shared/component/base-cardview/base-cardview.component';
import { ActiveList } from '../../shared/interface/active-list.interface';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, BaseCardviewComponent, HttpClientModule],
  templateUrl: './users.component.html',
  providers: [UsersService],
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  users: User[] = [];
  loading: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

   /**
   * gets the list available list from the api
   */
  getUsers() {
    this.loading = true;
    this.usersService.getUsers()
    .pipe(takeUntil(this.destroyed$))
      .subscribe((res: User[]) => {
        this.loading = false;
        this.users = res;
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
