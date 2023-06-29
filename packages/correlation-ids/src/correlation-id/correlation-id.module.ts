import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CorrelationIdMiddleware } from "./correlation-id.middleware";
import { ModuleAsyncOptions, ModuleOptions } from "./types";
import { CorrelationIdCoreModule } from "./correlation-id-core.module";

@Global()
@Module({})
export class CorrelationIdModule implements NestModule {
  public static forRoot(options?: ModuleOptions): DynamicModule {
    return {
      module: CorrelationIdModule,
      imports: [CorrelationIdCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: ModuleAsyncOptions): DynamicModule {
    return {
      module: CorrelationIdModule,
      imports: [CorrelationIdCoreModule.forRootAsync(options)],
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
