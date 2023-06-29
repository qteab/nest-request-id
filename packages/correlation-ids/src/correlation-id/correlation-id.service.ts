import { Injectable } from "@nestjs/common";
import { getCorrelationId } from "./correlation-id.store";

@Injectable()
export class CorrelationIdService {
  public get() {
    return getCorrelationId();
  }
}
