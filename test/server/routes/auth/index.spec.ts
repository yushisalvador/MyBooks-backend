import request from "supertest";
import { expect } from "chai";

import buildServer from "server";
const app = buildServer();

describe("auth routes", function () {
  it("/auth responds with 200", function (done) {
    request(app).get("/auth").expect(200, done);
  });
});
