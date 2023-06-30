import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { CorrelationIdStore } from './correlation-id.store';
import { MODULE_OPTIONS_KEY } from './correlation-id.constants';
import { ModuleOptions } from './types';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(MODULE_OPTIONS_KEY)
    private readonly options: ModuleOptions | undefined
  ) {}
  use(request: Request, response: Response, next: NextFunction) {
    // Set correlation ID either from header or generate a new one
    const correlationIdFromHeader = this.options?.headerName
      ? request.headers[this.options.headerName.toLocaleLowerCase()]
      : undefined;
    const correlationId =
      correlationIdFromHeader && typeof correlationIdFromHeader === 'string'
        ? correlationIdFromHeader
        : randomUUID();

    // Set response header if enabled
    const responseHeaderEnabled = this.options?.responseHeaderEnabled ?? true;
    if (this.options?.headerName && responseHeaderEnabled) {
      response.setHeader(this.options.headerName, correlationId);
    }
    CorrelationIdStore.run(correlationId, () => {
      next();
    });
  }
}
