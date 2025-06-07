/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
    return knex.schema.alterTable('clubs', (table) => {
      table.string('description').nullable();
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  export async function down(knex) {
    return knex.schema.alterTable('clubs', (table) => {
      table.dropColumn('description');
    });
  };
  