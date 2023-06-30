# Nest Correlation IDs

This package uses middleware to set a correlation ID for each request or optionally sets the request ID from a user defined header.

## Installation

```bash
pnpm add @qte/nest-correlation-ids
yarn add @qte/nest-correlation-ids
npm i @qte/nest-correlation-ids
```

Make sure you've also installed the peer dependencies `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `rxjs` and `reflect-metadata`

## Basic usage

Import the `CorrelationIdModule` synchronously (`forRoot`) or asynchronously (`forRootAsync`).

```typescript
@Module({
  imports: [
    CorrelationIdModule.forRoot({
      headerName: 'Cool-Project-Correlation-Id',
    }),
  ],
})
export class AppModule {}
```

```typescript
@Module({
  imports: [
    ConfigurationModule,
    CorrelationIdModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService]
      useFactory: (configService: ConfigurationService) => {
        const headerNameFromConfig =
        return {
          headerName: 'Cool-Project-Correlation-Id',
        };
      },
    }),
  ],
})
export class AppModule {}
```

When module is imported you can inject the `CorrelationIdService` to any provider.

```typescript
@Injectable()
class CoolService {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  public someFunction() {
    console.log(correlationIdService.get());
  }
}
```

## Usage with a logger

TODO
