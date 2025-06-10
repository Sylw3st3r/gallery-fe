import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private pendingRequests = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  startRequest() {
    this.pendingRequests++;
    if (this.pendingRequests === 1) {
      this.loadingSubject.next(true);
    }
  }

  endRequest() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
