import { Injectable } from '@nestjs/common';
import { getRequestId } from './request-id.store';

@Injectable()
export class RequestIdService {
  public get() {
    return getRequestId();
  }
}
