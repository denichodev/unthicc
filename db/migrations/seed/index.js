const db = require('rethinkdbdash')({
  db: 'unthicc',
});

Promise.all([
  db
    .table('keys')
    .insert('comm')
    .run()
])
  .then(() => {
    console.log('Success!');
  });
