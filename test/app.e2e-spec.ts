import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { v4 as uuidv4 } from 'uuid';

describe('e2e tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Whatsup');
  });

  const id = uuidv4();

  const key = uuidv4();
  const value = 'some text data';

  it('storing data', () => {
    return request(app.getHttpServer())
      .post('/storing/store-data')
      .send({id, encryption_key: key, value})
      .expect(201)
      .expect('Data successfully stored');
  });

  it('receiving data', () => {
    return request(app.getHttpServer())
      .post('/storing/get-data')
      .send({id, decryption_key: key})
      .expect(201, [{
        id,
        value
      }])
  });


});
