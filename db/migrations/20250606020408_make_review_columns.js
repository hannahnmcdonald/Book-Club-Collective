/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
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
  export async function down(knex) {
    return knex.schema.alterTable('reviews', (table) => {
      table.dropColumn('isbn');
      table.dropColumn('title');
      table.dropColumn('stars');
      table.dropColumn('description');
      table.dropColumn('favorite_quote');
    });
  };
  
  