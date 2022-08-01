import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    { id: 1, username: "caoh_the_nerd", pass: "iamawesome" },
    { id: 2, username: "crazy_toffer", pass: "awesomepass" },
    { id: 3, username: "test_user", pass: "1234" },
  ]);
}
