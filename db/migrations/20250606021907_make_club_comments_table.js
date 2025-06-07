/**
 * @param {import('knex')} knex
 */
export async function up(knex) {
    return knex.schema.createTable('club_comments', (table) => {
      table.increments('id').primary();
      table
        .integer('club_id')
        .notNullable()
        .references('id')
        .inTable('clubs')
        .onDelete('CASCADE');
      table.string('comment_text').notNullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
  };
  
  /**
   * @param {import('knex')} knex
   */
  export async function down(knex) {
    return knex.schema.dropTableIfExists('club_comments');
  };
  