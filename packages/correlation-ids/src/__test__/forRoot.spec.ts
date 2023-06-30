import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CorrelationIdModule } from '~/correlation-id';

const HEADER_NAME = 'Test-Correlation-Id';

describe('CorrelationIdModule.forRoot', () => {
  it('initializes correctly', async () => {
    const module = await Test.createTestingModule({
      imports: [
        CorrelationIdModule.forRoot({
          headerName: HEADER_NAME,
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
