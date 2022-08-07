import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tokens", (table) => {
    table.integer("user_id").references("id").inTable("users");
    table.string("refreshToken");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tokens");
}
