import request from "supertest";
import buildServer from "server";
import { expect } from "chai";
const app = buildServer();
const fixtures = require("../fixtures.ts");

describe("POST User registration", () => {
  const newUserObj = fixtures.getUser();
  afterEach(async () => {
    await request(app).delete(`/auth?username=${newUserObj.username}`);
  });

  it("should return status 201 when registration is successful", async () => {
    const res = await request(app).post("/auth/register").send(newUserObj);
    expect(res.statusCode).equals(201);
  });

  it("should never store an unhashed password", async () => {
    await request(app).post("/auth/register").send(newUserObj);
    const allUsers = await request(app).get("/auth");
    const findUser = await allUsers.body.find(
      (user: any) => user.username === newUserObj.username
    );
    expect(findUser.pass).to.not.equal(newUserObj.pass);
  });
});
