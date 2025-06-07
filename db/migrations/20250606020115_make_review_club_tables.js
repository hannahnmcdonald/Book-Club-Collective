/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
  
    // Create reviews table
    await knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.text('content');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  
    // Create clubs table
    await knex.schema.createTable('clubs', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists('clubs');
    await knex.schema.dropTableIfExists('reviews');
  };
  