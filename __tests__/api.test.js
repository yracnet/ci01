import { describe, expect, test } from "vitest";
import { handler } from "@api/handler";
import request from "supertest";
import express from "express";
const app = express();
app.use("/api", handler);

describe("API Tests", () => {
  test("should return 200 OK for GET /api/books", async () => {
    const response = await request(app).get("/api/books").expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta Base");
  });

  test("should return 200 OK for GET /api/books/info", async () => {
    const response = await request(app).get("/api/books/info").expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta INFO");
  });

  test("should return 200 OK for GET /api/books/crear", async () => {
    const response = await request(app).get("/api/books/crear").expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta CREAR");
  });
});
