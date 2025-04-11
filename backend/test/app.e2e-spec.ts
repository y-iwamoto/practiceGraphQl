import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { GraphQLResponse, UsersResponse } from '../src/types/graphql.types';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

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
      .expect('Hello World!');
  });

  // resolverのuser全件取得テスト
  it('/graphql - should fetch all users', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            users {
              id
              email
              firstName
              lastName
              createdAt
              updatedAt
            }
          }
        `,
      })
      .expect(200)
      .expect((res: GraphQLResponse<UsersResponse>) => {
        const users = res.body.data.users;
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);

        const user = users[0];
        expect(user.email).toBeDefined();
        expect(typeof user.email).toBe('string');
        expect(user.firstName).toBeDefined();
        expect(typeof user.firstName).toBe('string');
        expect(user.lastName).toBeDefined();
        expect(typeof user.lastName).toBe('string');
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
      });
  });
});
