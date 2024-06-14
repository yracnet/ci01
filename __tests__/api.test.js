const request = require("supertest");

describe("API Tests", () => {
  it("should return 200 OK for GET /api/books", async () => {
    console.log("TEST....");
    const response = await request("http://localhost:5173")
      .get("/api/books")
      .expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta 1");
  });

  it("should return 200 OK for GET /api/books/info", async () => {
    console.log("TEST....");
    const response = await request("http://localhost:5173")
      .get("/api/books/info")
      .expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta INFO");
  });

  it("should return 200 OK for GET /api/books/crear", async () => {
    console.log("TEST....");
    const response = await request("http://localhost:5173")
      .get("/api/books/crear")
      .expect(200);
    // console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta CREAR");
  });
});
