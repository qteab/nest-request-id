import { Test } from '@nestjs/testing';
import { RequestIdModule } from '~/request-id';

const HEADER_NAME = 'Test-Request-Id';

describe('RequestIdModule.forRootAsync', () => {
  it('initializes correctly', async () => {
    const module = await Test.createTestingModule({
      imports: [
        RequestIdModule.forRootAsync({
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
