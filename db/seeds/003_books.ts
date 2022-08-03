import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("books").del("books");

  await knex("books").insert([
    {
      id: 1,
      author: "John Ousterhout",
      title: "A Philosophy of Software Design",
      date_finished: "2022-06-23T18:25:43.511Z",
      registered_by: "caoh_the_nerd",
    },
    {
      id: 2,
      author: "Dr Carol S. Dweck",
      title: "Mindset",
      date_finished: "2022-07-23T18:25:43.511Z",
      registered_by: "test_user",
    },
    {
      id: 3,
      author: "James Clear",
      title: "Atomic Habits",
      date_finished: "2022-05-23T18:25:43.511Z",
      registered_by: "crazy_toffer",
    },
  ]);
}
