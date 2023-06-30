import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModuleAsyncOptions, ModuleOptions } from './types';
import { CorrelationIdCoreModule } from './correlation-id-core.module';

@Module({})
export class CorrelationIdModule {
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
}
