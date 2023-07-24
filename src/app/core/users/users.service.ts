import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/interface/user.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    // http call to get list of users
    getUsers(): Observable<User[]> {
        const user_endpoint = environment.users_URL;
        return this.http.get<User[]>(user_endpoint).pipe(map(response => response));
    }

    // http call to get single user item
    getUser(id: string): Observable<User> {
        const user_endpoint = environment.users_URL + '/' + id;
        return this.http.get<User>(user_endpoint).pipe(map(response => response));
    }
}