import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("author").notNullable();
    table.string("title").notNullable();
    table.date("date_finished");
    table.string("registered_by").references("username").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("books");
}
