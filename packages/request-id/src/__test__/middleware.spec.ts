import { Controller, Get } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { RequestIdModule, RequestIdService, getRequestId } from '~/request-id';

const HEADER_NAME = 'Test-Request-Id';

@Controller()
class TestController {
  constructor(private readonly requestIdService: RequestIdService) {}

  @Get('/service')
  public async get() {
    return {
      requestId: this.requestIdService.get(),
    };
  }

  @Get('/function')
  public async fn() {
    return {
      requestId: getRequestId(),
    };
  }
}

describe('RequestIdMiddleware', () => {
  let client: () => request.SuperTest<request.Test>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        RequestIdModule.forRoot({
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

  it.each(['/service', '/function'])(
    'sets a random uuid for each request when header is not supplied (%s)',
    async endpoint => {
      const response = await client().get(endpoint);
      expect(response.body.requestId).not.toBeNull();
      expect(response.body.requestId).toHaveLength(36);
      expect(response.headers[HEADER_NAME.toLowerCase()]).toEqual(
        response.body.requestId
      );
    }
  );

  it.each(['/service', '/function'])(
    'sets the request id provided header value (%s)',
    async endpoint => {
      const expectedRequestId = 'cad843ba-6299-4733-a707-ced5167ac52e';
      const response = await client()
        .get(endpoint)
        .set(HEADER_NAME, expectedRequestId);
      expect(response.body.requestId).toBe(expectedRequestId);
      expect(response.headers[HEADER_NAME.toLowerCase()]).toEqual(
        expectedRequestId
      );
    }
  );
});
