import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ITransaction } from '../models/transaction.interface';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  public transasction$: Observable<ITransaction>;

  public transctionFromGroup = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    Comments: new FormControl('', [Validators.required]),
  });
  constructor(
    private _transactionService: TransactionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.transasction$ = this._transactionService
      .getTransaction(this._activatedRoute.snapshot.params.id)
      .pipe(
        tap((transaction) => {
          this.transctionFromGroup.patchValue({
            id: transaction.id,
            date: new Date(transaction.date),
            Comments: transaction.Comments,
          });
        })
      );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public updateComment(): void {
    const formValues = this.transctionFromGroup.value;
    this._transactionService
      .updateTransaction(formValues.id, formValues.Comments)
      .subscribe(() => {
        this.goBack();
      });
  }

  public goBack(): void {
    this._router.navigate(['../']);
  }
}
