# Nest Request ID

This package uses middleware to set a request ID for each request or optionally sets the request ID from a user defined header.

## Installation

```bash
pnpm add @qte/nest-request-id
yarn add @qte/nest-request-id
npm i @qte/nest-request-id
```

Make sure you've also installed the peer dependencies `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `rxjs` and `reflect-metadata`

## Basic usage

Import the `RequestIdModule` synchronously (`forRoot`) or asynchronously (`forRootAsync`).

```typescript
@Module({
  imports: [
    RequestIdModule.forRoot({
      headerName: 'Cool-Request-Id',
    }),
  ],
})
export class AppModule {}
```

```typescript
@Module({
  imports: [
    ConfigurationModule,
    RequestIdModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService]
      useFactory: (configService: ConfigurationService) => {
        const headerNameFromConfig =
        return {
          headerName: 'Cool-Project-Request-Id',
        };
      },
    }),
  ],
})
export class AppModule {}
```

When module is imported you can inject the `RequestIdService` to any provider or you can use the `getRequestId()` function.

```typescript
import { RequestIdService } from '@qte/nest-request-id';

@Injectable()
class CoolService {
  constructor(private readonly requestIdService: RequestIdService) {}

  public someFunction() {
    console.log(requestIdService.get());
  }
}
```

```typescript
import { getRequestId } from '@qte/nest-request-id';

@Injectable()
class CoolService {
  constructor() {}

  public someFunction() {
    console.log(getRequestId());
  }
}
```

## Usage with a logger

TODO
