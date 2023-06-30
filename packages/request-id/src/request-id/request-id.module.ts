import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModuleAsyncOptions, ModuleOptions } from './types';
import { RequestIdCoreModule } from './request-id-core.module';

@Module({})
export class RequestIdModule {
  public static forRoot(options?: ModuleOptions): DynamicModule {
    return {
      module: RequestIdModule,
      imports: [RequestIdCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: ModuleAsyncOptions): DynamicModule {
    return {
      module: RequestIdModule,
      imports: [RequestIdCoreModule.forRootAsync(options)],
    };
  }
}
