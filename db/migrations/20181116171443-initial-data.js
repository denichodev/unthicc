/* eslint-disable */
'use strict';

exports.up = function(r, conn) {
  return Promise.all([
    r
      .tableCreate('urls', {
        primaryKey: 'hash',
      })
      .run(conn)
      .catch((err) => {
        console.log(err);
        throw err;
      })
  ]).catch(err => {
    console.log(err);
    throw err;
  });
};

exports.down = function(r, conn) {
  return Promise.all([
    r
      .tableDrop('urls')
      .run(conn)
      .catch(err => {
        console.log(err);
        throw err;
      })
  ]).catch(err => {
    console.log(err);
    throw err;
  });
};
