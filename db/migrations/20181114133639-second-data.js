'use strict'

exports.up = function (r, conn) {
  return Promise.all([
    r
      .table('keys')
      .indexCreate('originalUrl', r.row('originalUrl'))
      .run(conn)
      .catch((err) => {
        console.log(err);
        throw err;
      })
  ])
}

exports.down = function (r, conn) {
  // must return a Promise!
}
