'use strict';

exports.up = function(r, conn) {
  return Promise.all([
    // Create tables
    r
      .tableCreate('keys')
      .run(conn)
      .catch((err) => {
        console.log(err);
        throw err;
      })
  ]).then(() =>
    Promise.all([
      r
        .table('keys')
        .indexCreate('shortUrl', r.row('shortUrl'))
        .run(conn)
        .catch((err) => {
          console.log(err);
          throw err;
        })
    ])
  );
};

exports.down = function(r, conn) {
  // must return a Promise!
};