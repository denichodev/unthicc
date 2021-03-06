import test from 'ava';
import supertest from 'supertest';
import createApp from '../src/createApp';

test.beforeEach(t => {
  // eslint-disable-next-line
  t.context.app = createApp();
});

test.afterEach.always(t => {
  t.context.app.close();
});

test('GET `/ping` route', async t => {
  const { app } = t.context;
  const testResp = {
    data: {
      message: 'pong',
    },
  };

  await app.ready();

  const response = await supertest(app.server)
    .get('/ping')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');

  t.is(response.body.data.message, testResp.data.message);
});
