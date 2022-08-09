import request from "supertest";
import buildServer from "../../../../src/server";
import { expect } from "chai";
import { User } from "../../../../src/types/types";

const app = buildServer();
const fixtures = require("../fixtures.ts");

describe("POST User registration", () => {
  const newUserObj = fixtures.getUser();
  let token: String;

  afterEach(async () => {
    await request(app)
      .delete(`/auth/user?username=${newUserObj.username}`)
      .set({ Authorization: "Bearer " + token });
  });

  it("should return status 201 when registration is successful", async () => {
    const res = await request(app).post("/auth/register").send(newUserObj);
    token = res.body.accessToken;
    expect(res.statusCode).equals(201);
  });

  it("should return 401 if username or password is not given", async () => {
    const newObj = {
      username: null,
      password: "12345",
    };
    const newObj2 = {
      username: "no_pass_test",
      password: null,
    };
    const registerAttempt = await request(app)
      .post("/auth/register")
      .send(newObj);

    const registerAttempt2 = await request(app)
      .post("/auth/register")
      .send(newObj2);

    expect(registerAttempt.statusCode).to.equal(401);
    expect(registerAttempt2.statusCode).to.equal(401);
  });

  describe("POST registration check db", async () => {
    let userId: Number;
    let token: String;
    const newUserObj = fixtures.getUser();

    afterEach(async () => {
      await request(app)
        .delete(`/auth/user?username=${newUserObj.username}`)
        .set({ Authorization: "Bearer " + token });
      await request(app).delete(`/auth/logout/${userId}`);
    });

    it("should store the username and password to the database", async () => {
      await request(app).post("/auth/register").send(newUserObj);

      const getAuthUser = await request(app)
        .post("/auth/login")
        .send(newUserObj);
      token = getAuthUser.body.accessToken;
      userId = getAuthUser.body.id;

      const allUsers = await request(app)
        .get("/auth/users")
        .set({ Authorization: "Bearer " + token });
      const newUser = await allUsers.body.find(
        (user: User) => user.username === newUserObj.username
      );

      expect(newUser).to.not.equal(undefined);
    });

    it("should never store an unhashed password", async () => {
      await request(app).post("/auth/register").send(newUserObj);

      const getAuthUser = await request(app)
        .post("/auth/login")
        .send(newUserObj);
      token = getAuthUser.body.accessToken;

      const allUsers = await request(app)
        .get("/auth/users")
        .set({ Authorization: "Bearer " + token });
      const findUser = await allUsers.body.find(
        (user: User) => user.username === newUserObj.username
      );

      expect(findUser.pass).to.not.equal(newUserObj.pass);
    });
  });
});

describe("POST login errors", () => {
  const wrongPassUserObj = {
    username: "brandon",
    pass: "wrongpass",
  };
  const wrongUsernameObj = {
    username: "kyle_notfound",
    pass: "wrongpass",
  };

  it("should return error 401 when passwords doesn't match", async () => {
    const login = await request(app).post("/auth/login").send(wrongPassUserObj);
    expect(login.statusCode).equals(401);
  });

  it("should return status 404 if the user with the username is not found", async () => {
    const login = await request(app).post("/auth/login").send(wrongUsernameObj);
    expect(login.statusCode).equals(404);
  });
});

describe("POST login success", () => {
  const userObj = fixtures.getUser();
  let token: String;
  before(async () => {
    await request(app).post("/auth/register").send(userObj);
  });
  after(async () => {
    await request(app)
      .delete(`/auth/user?username=${userObj.username}`)
      .set({ Authorization: "Bearer " + token });
  });

  it("should respond with the access token and refresh token when the login is successful", async () => {
    const login = await request(app).post("/auth/login").send(userObj);
    token = login.body.accessToken;
    expect(login.statusCode).equals(200);
    expect(login.body).to.include.keys("accessToken");
    expect(login.body).to.include.keys("refreshToken");
  });
});
