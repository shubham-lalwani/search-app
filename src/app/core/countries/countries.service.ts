import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../../shared/interface/country.interface';

@Injectable()
export class CountriesService {

    constructor(private http: HttpClient) { }

    // http call to get list of countries
    getCountries(): Observable<Country[]> {
        const user_endpoint = environment.countries_URL;
        return this.http.get<Country[]>(user_endpoint).pipe(map(response => response));
    }

    // http call to get single country item
    getCountry(id:string): Observable<Country> {
        const user_endpoint = environment.countries_URL + '/' + id;
        return this.http.get<Country>(user_endpoint).pipe(map(response => response));
    }
}