import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { transactionsMock } from '../data/transactions.mock';
import { ITransaction } from '../models/transaction.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TransactionService {
  private _transactions = transactionsMock;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  public getTransactions(): Observable<ITransaction[]> {
    // TODO call actual end point
    return of(this._transactions);
  }

  public getTransaction(id: string): Observable<ITransaction> {
    // TODO call actual end point
    return of(this._transactions).pipe(
      map(() => {
        const record = this._transactions.find(
          (transaction) => transaction.id == id
        );
        return record;
      })
    );
  }

  public updateTransaction(id: string, comments: string): Observable<boolean> {
    const index = this._transactions.findIndex(
      (transaction) => transaction.id === id
    );

    this._transactions[index].Comments = comments;

    this._snackBar.open('Comment updated successfully.', '', {
      duration: 1000,
    });
    return of(true);
  }
}
