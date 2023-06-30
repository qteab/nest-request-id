import {
  DynamicModule,
  FactoryProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValueProvider,
} from '@nestjs/common';
import { RequestIdMiddleware } from './request-id.middleware';
import { ModuleAsyncOptions, ModuleOptions } from './types';
import { RequestIdService } from './request-id.service';
import { MODULE_OPTIONS_KEY } from './request-id.constants';

@Global()
@Module({})
export class RequestIdCoreModule implements NestModule {
  public static forRootAsync(options: ModuleAsyncOptions): DynamicModule {
    const optionsProvider: FactoryProvider = {
      provide: MODULE_OPTIONS_KEY,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      exports: [RequestIdService],
      imports: options.imports,
      module: RequestIdCoreModule,
      providers: [optionsProvider, RequestIdService],
    };
  }

  public static forRoot(options?: ModuleOptions): DynamicModule {
    const optionsProvider: ValueProvider = {
      provide: MODULE_OPTIONS_KEY,
      useValue: options,
    };

    return {
      exports: [RequestIdService],
      module: RequestIdCoreModule,
      providers: [optionsProvider, RequestIdService],
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
