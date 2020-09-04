exports.up = async function(knex) {
    await
      knex.schema
      .createTable('users', tbl => {
          tbl.increments();
          tbl.string('username', 128)
              .notNullable()
              .unique()
              .index();
          tbl.string('password', 256)
              .notNullable();
          })
  };
  
  exports.down = async function(knex) {
    await
        knex.schema
          .dropTableIfExists('users')
  };