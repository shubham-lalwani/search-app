import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payment } from '../../shared/interface/payment.interface';

@Injectable()
export class PaymentsService {

    constructor(private http: HttpClient) { }

     // http call to get list of payments
    getPayments(): Observable<Payment[]> {
        const user_endpoint = environment.payments_URL;
        return this.http.get<Payment[]>(user_endpoint).pipe(map(response => response));
    }

    // http call to get single payment item
    getPayment(id:string): Observable<Payment> {
        const user_endpoint = environment.payments_URL + '/' + id;
        return this.http.get<Payment>(user_endpoint).pipe(map(response => response));
    }
}