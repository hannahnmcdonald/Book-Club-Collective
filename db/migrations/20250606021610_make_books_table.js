/**
 * @param {import('knex')} knex
 */
exports.up = async function(knex) {
    return knex.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.string('genre').notNullable();
      table.integer('pages').nullable();
      table.integer('number_of_reviews').nullable();
      table.integer('star_average').nullable();
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('books');
  };
  