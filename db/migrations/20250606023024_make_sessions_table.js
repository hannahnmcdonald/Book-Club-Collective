/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
    await knex.schema.createTable('session', (table) => {
      table.string('sid').primary().notNullable();
      table.json('sess').notNullable();
      table.timestamp('expire', { precision: 6 }).notNullable();
    });
  }
  
  /**
   * @param {import('knex')} knex
   */
  export async function down(knex) {
    await knex.schema.dropTableIfExists('session');
  }
  