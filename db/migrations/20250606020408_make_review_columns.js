/**
 * @param {import('knex')} knex
 */
exports.up = async function(knex) {
    return knex.schema.alterTable('reviews', (table) => {
      table.string('isbn').notNullable();
      table.string('title').notNullable();
      table.integer('stars').nullable();
      table.text('description').nullable();
      table.string('favorite_quote').nullable();
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  exports.down = async function(knex) {
    return knex.schema.alterTable('reviews', (table) => {
      table.dropColumn('isbn');
      table.dropColumn('title');
      table.dropColumn('stars');
      table.dropColumn('description');
      table.dropColumn('favorite_quote');
    });
  };
  
  