import knex from 'knex';
export default knex({
  client: 'sqlite3',
  connection: {filename: './evolvix.db'},
  pool: {
    afterCreate(connection, callback) {
      connection.run('PRAGMA foreign_keys = ON', callback)
    }
  }
});
