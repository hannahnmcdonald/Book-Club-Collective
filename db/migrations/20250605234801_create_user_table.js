export async function up(knex){
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // auto-incrementing ID
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('fave_book');
    table.string('fave_gen');
    table.text('fave_q');
    table.integer('number_reviews');
    table.timestamp('date_joined').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}
