import test from 'ava';
import createApp from '../src/createApp';

test.beforeEach(t => {
  // eslint-disable-next-line
  t.context.app = createApp();
});

test.afterEach.always(t => {
  t.context.app.close();
});

test('GET `keys/ping` route', async t => {
  const { app } = t.context;
  const injection = {
    method: 'GET',
    url: '/api/keys/ping',
  };
  const testResp = {
    data: {
      message: 'pong!',
    },
  };

  try {
    const res = await app.inject(injection);

    t.is(res.statusCode, 200);
    t.is(res.headers['content-type'], 'application/json; charset=utf-8');
    t.deepEqual(JSON.parse(res.payload), testResp);
  } catch (err) {
    t.fail();
  };
});

// import tap from 'tap';
// import app from '../src/app';

// tap.test('GET `keys/ping` route', async (t) => {
//   t.plan(3);

//   // At the end of your tests it is highly recommended to call `.close()`
//   // to ensure that all connections to external services get closed.
//   t.tearDown(() => app.close());

//   try {
//     const res = await app.inject({ method: 'GET', url: '/api/keys/ping' });
//     const pingRes = {
//       data: {
//         message: 'pong!'
//       }
//     };

//     t.strictEqual(res.statusCode, 200);
//     t.strictEqual(
//       res.headers['content-type'],
//       'application/json; charset=utf-8'
//     );
//     t.deepEqual(JSON.parse(res.payload), pingRes);
//   } catch (err) {
//     t.error(err);
//   }
// });
