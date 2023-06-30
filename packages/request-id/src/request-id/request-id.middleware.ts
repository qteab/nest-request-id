import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { RequestIdStore } from './request-id.store';
import { MODULE_OPTIONS_KEY } from './request-id.constants';
import { ModuleOptions } from './types';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(MODULE_OPTIONS_KEY)
    private readonly options: ModuleOptions | undefined
  ) {}
  use(request: Request, response: Response, next: NextFunction) {
    // Set request ID either from header or generate a new one
    const requestIdFromHeader = this.options?.headerName
      ? request.headers[this.options.headerName.toLocaleLowerCase()]
      : undefined;
    const requestId =
      requestIdFromHeader && typeof requestIdFromHeader === 'string'
        ? requestIdFromHeader
        : randomUUID();

    // Set response header if enabled
    const responseHeaderEnabled = this.options?.responseHeaderEnabled ?? true;
    if (this.options?.headerName && responseHeaderEnabled) {
      response.setHeader(this.options.headerName, requestId);
    }
    RequestIdStore.run(requestId, () => {
      next();
    });
  }
}
