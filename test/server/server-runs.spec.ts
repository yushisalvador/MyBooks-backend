import { expect } from "chai";
import request from "supertest";
import buildServer from "server";

const app = buildServer();

describe("server check", function () {
  it("should create the server without an error", function (done) {
    request(app).get("/").expect(200, done);
  });
});
