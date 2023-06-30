import { Test } from '@nestjs/testing';
import { CorrelationIdModule } from '~/correlation-id';

const HEADER_NAME = 'Test-Correlation-Id';

describe('CorrelationIdModule.forRootAsync', () => {
  it('initializes correctly', async () => {
    const module = await Test.createTestingModule({
      imports: [
        CorrelationIdModule.forRootAsync({
          useFactory: () => ({
            headerName: HEADER_NAME,
          }),
        }),
      ],
      controllers: [],
      providers: [],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    expect(app).toBeDefined();
  });
});
