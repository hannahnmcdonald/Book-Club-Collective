/**
 * @param {import('knex')} knex
 */
exports.up = async function(knex) {
    return knex.schema.alterTable('clubs', (table) => {
      table.string('description').nullable();
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  exports.down = async function(knex) {
    return knex.schema.alterTable('clubs', (table) => {
      table.dropColumn('description');
    });
  };
  