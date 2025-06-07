/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
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
  export async function down(knex) {
    return knex.schema.dropTableIfExists('books');
  };
  