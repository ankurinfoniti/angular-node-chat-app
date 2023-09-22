import { inject } from '@angular/core';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '../loader/loader.service';

export const loaderInterceptor = () => {
  const interceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => {
    const loaderService = inject(LoaderService);

    loaderService.show();

    return next(req).pipe(finalize(() => loaderService.hide()));
  };

  return interceptor;
};
