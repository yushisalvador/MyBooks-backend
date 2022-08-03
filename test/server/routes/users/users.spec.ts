import request from "supertest";
import buildServer from "../../../../src/server";
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

  it("should store the username and password to the database", async () => {
    await request(app).post("/auth/register").send(newUserObj);
    const allUsers = await request(app).get("/auth");
    const newUser = await allUsers.body.find(
      (user: any) => user.username === newUserObj.username
    );
    expect(newUser).to.not.equal(undefined);
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

it("should return 401 if username or password is not given", async () => {
  const newObj = {
    password: "12345",
  };
  const registerAttempt = await request(app)
    .post("/auth/register")
    .send(newObj);
  expect(registerAttempt.statusCode).to.equal(401);
});

describe("POST login", () => {
  const userObj = fixtures.getUser();
  const wrongUserObj = {
    username: "kylehansamu",
    pass: "wrongpass",
  };

  before(async () => {
    await request(app).post("/auth/register").send(userObj);
  });

  after(async () => {
    await request(app).delete(`/auth?username=${userObj.username}`);
  });

  it("should return error 401 when passwords doesn't match", async () => {
    const login = await request(app).post("/auth/login").send(wrongUserObj);
    expect(login.statusCode).equals(401);
  });
});
