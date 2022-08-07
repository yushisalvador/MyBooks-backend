// import request from "supertest";
// import buildServer from "../../../../src/server";
// import { expect } from "chai";
// const app = buildServer();
// const fixtures = require("../fixtures.ts");
// import { User } from "../../../../src/types/types";
// describe("POST User registration", () => {
//   const newUserObj = fixtures.getUser();
//   afterEach(async () => {
//     await request(app).delete(`/auth?username=${newUserObj.username}`);
//   });

//   it("should return status 201 when registration is successful", async () => {
//     const res = await request(app).post("/auth/register").send(newUserObj);
//     expect(res.statusCode).equals(201);
//   });

//   it("should store the username and password to the database", async () => {
//     await request(app).post("/auth/register").send(newUserObj);
//     const allUsers = await request(app).get("/auth");
//     const newUser = await allUsers.body.find(
//       (user: User) => user.username === newUserObj.username
//     );
//     expect(newUser).to.not.equal(undefined);
//   });

//   it("should never store an unhashed password", async () => {
//     await request(app).post("/auth/register").send(newUserObj);
//     const allUsers = await request(app).get("/auth");
//     const findUser = await allUsers.body.find(
//       (user: User) => user.username === newUserObj.username
//     );
//     expect(findUser.pass).to.not.equal(newUserObj.pass);
//   });
// });

// it("should return 401 if username or password is not given", async () => {
//   const newObj = {
//     password: "12345",
//   };
//   const registerAttempt = await request(app)
//     .post("/auth/register")
//     .send(newObj);
//   expect(registerAttempt.statusCode).to.equal(401);
// });

// describe("POST login errors", () => {
//   const userObj = fixtures.getUser();
//   const wrongPassUserObj = {
//     username: "kylehansamu",
//     pass: "wrongpass",
//   };
//   const wrongUsernameObj = {
//     username: "kyle_notfound",
//     pass: "wrongpass",
//   };

//   before(async () => {
//     await request(app).post("/auth/register").send(userObj);
//   });

//   after(async () => {
//     await request(app).delete(`/auth?username=${userObj.username}`);
//   });

//   it("should return error 401 when passwords doesn't match", async () => {
//     const login = await request(app).post("/auth/login").send(wrongPassUserObj);
//     expect(login.statusCode).equals(401);
//   });

//   it("should return status 404 if the user with the username is not found", async () => {
//     const login = await request(app).post("/auth/login").send(wrongUsernameObj);
//     expect(login.statusCode).equals(404);
//   });
// });

// describe("POST login success", () => {
//   const userObj = fixtures.getUser();

//   before(async () => {
//     await request(app).post("/auth/register").send(userObj);
//   });
//   after(async () => {
//     await request(app).delete(`/auth?username=${userObj.username}`);
//   });

//   it("should respond with the access token and refresh token when the login is successful", async () => {
//     const login = await request(app).post("/auth/login").send(userObj);
//     expect(login.statusCode).equals(200);
//     expect(login.body).to.include.keys("accessToken");
//     expect(login.body).to.include.keys("refreshToken");
//   });
// });
