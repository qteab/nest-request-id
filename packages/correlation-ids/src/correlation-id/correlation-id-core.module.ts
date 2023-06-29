import {
  DynamicModule,
  FactoryProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValueProvider,
} from "@nestjs/common";
import { CorrelationIdMiddleware } from "./correlation-id.middleware";
import { ModuleAsyncOptions, ModuleOptions } from "./types";
import { CorrelationIdService } from "./correlation-id.service";
import { MODULE_OPTIONS_KEY } from "./correlation-id.constants";

@Global()
@Module({})
export class CorrelationIdCoreModule implements NestModule {
  public static forRootAsync(options: ModuleAsyncOptions): DynamicModule {
    const optionsProvider: FactoryProvider = {
      provide: MODULE_OPTIONS_KEY,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      exports: [],
      imports: options.imports,
      module: CorrelationIdCoreModule,
      providers: [optionsProvider],
    };
  }

  public static forRoot(options?: ModuleOptions): DynamicModule {
    const optionsProvider: ValueProvider = {
      provide: MODULE_OPTIONS_KEY,
      useValue: options,
    };

    return {
      exports: [CorrelationIdService],
      module: CorrelationIdCoreModule,
      providers: [optionsProvider],
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
