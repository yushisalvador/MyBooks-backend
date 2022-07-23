import request from "supertest";
import { expect } from "chai";
import buildServer from "server";
const app = buildServer();

describe("auth routes", function () {
  it("should respond with 200", function (done) {
    request(app).get("/auth").expect(200, done);
  });
});
