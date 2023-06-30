import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import { CorrelationIdStore } from "./correlation-id.store";
import { MODULE_OPTIONS_KEY } from "./correlation-id.constants";
import { ModuleOptions } from "./types";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(
    @Inject(MODULE_OPTIONS_KEY)
    private readonly options: ModuleOptions | undefined
  ) {}
  use(request: Request, res: Response, next: NextFunction) {
    const correlationIdFromHeader = this.options?.headerName
      ? request.headers[this.options.headerName.toLocaleLowerCase()]
      : undefined;
    const correlationId =
      correlationIdFromHeader && typeof correlationIdFromHeader === "string"
        ? correlationIdFromHeader
        : randomUUID();
    CorrelationIdStore.run(correlationId, () => {
      next();
    });
  }
}
