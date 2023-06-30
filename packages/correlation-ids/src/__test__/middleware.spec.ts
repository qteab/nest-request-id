import { Controller, Get } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CorrelationIdModule, CorrelationIdService } from '~/correlation-id';

const HEADER_NAME = 'Test-Correlation-Id';

@Controller()
class TestController {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  @Get('/')
  public async get() {
    return {
      correlationId: this.correlationIdService.get(),
    };
  }
}

describe('CorrelationIdModule.forRoot', () => {
  let client: () => request.SuperTest<request.Test>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CorrelationIdModule.forRoot({
          headerName: HEADER_NAME,
          responseHeaderEnabled: true,
        }),
      ],
      controllers: [TestController],
      providers: [],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    client = () => request(app.getHttpServer());
  });

  it('sets a random uuid for each request when header is not supplied', async () => {
    const response = await client().get('/');
    expect(response.body.correlationId).not.toBeNull();
    expect(response.body.correlationId).toHaveLength(36);
    expect(response.headers[HEADER_NAME.toLowerCase()]).toEqual(
      response.body.correlationId
    );
  });

  it('sets a random uuid for each request when header is not supplied', async () => {
    const expectedCorrelationId = 'cad843ba-6299-4733-a707-ced5167ac52e';
    const response = await client()
      .get('/')
      .set(HEADER_NAME, expectedCorrelationId);
    expect(response.body.correlationId).toBe(expectedCorrelationId);
    expect(response.headers[HEADER_NAME.toLowerCase()]).toEqual(
      expectedCorrelationId
    );
  });
});
