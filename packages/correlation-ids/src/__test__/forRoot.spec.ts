import { Test } from "@nestjs/testing";
import request from "supertest";
import { CorrelationIdModule } from "~/correlation-id";
import { TestController } from "./test.controller";

const HEADER_NAME = "Test-Correlation-Id";

describe("CorrelationIdModule.forRoot", () => {
  let client: () => request.SuperTest<request.Test>;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CorrelationIdModule.forRoot({
          headerName: HEADER_NAME,
        }),
      ],
      controllers: [TestController],
      providers: [],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    client = () => request(app.getHttpServer());
  });

  it("sets a random uuid for each request when header is not supplied", async () => {
    const response = await client().get("/");
    expect(response.body.correlationId).not.toBeNull();
    expect(response.body.correlationId).toHaveLength(36);
  });

  it("sets a random uuid for each request when header is not supplied", async () => {
    const expectedCorrelationId = "cad843ba-6299-4733-a707-ced5167ac52e";
    const response = await client()
      .get("/")
      .set(HEADER_NAME, expectedCorrelationId);
    expect(response.body.correlationId).toBe(expectedCorrelationId);
  });
});
