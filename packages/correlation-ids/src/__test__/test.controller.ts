import { Controller, Get, Post } from "@nestjs/common";
import { CorrelationIdService } from "~/correlation-id";

@Controller()
export class TestController {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  @Get("/")
  public async get() {
    return {
      correlationId: this.correlationIdService.get(),
    };
  }
}
