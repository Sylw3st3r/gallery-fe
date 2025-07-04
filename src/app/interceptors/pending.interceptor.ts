import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const pendingRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.startRequest();

  return next(req).pipe(
    finalize(() => {
      loadingService.endRequest();
    }),
  );
};
