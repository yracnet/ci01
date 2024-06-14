const request = require("supertest");
const crossSpawn = require("cross-spawn");
const path = require("path");

const rootDir = path.resolve(__dirname, "../");
console.log("ROOT:", rootDir);

describe("API Tests", () => {
  let serverProcess;

  beforeAll((done) => {
    serverProcess = crossSpawn("yarn", ["dev"], {
      cwd: rootDir,
      stdio: "pipe",
    });

    let stdout = "";
    serverProcess.stdout.on("data", (data) => {
      stdout += data.toString();
      if (stdout.includes("VITE")) {
        done();
      }
    });

    serverProcess.on("error", (err) => {
      console.error("Failed to start server:", err);
      done.fail(err);
    });
  });

  afterAll((done) => {
    serverProcess.kill("SIGINT");

    serverProcess.on("exit", (code) => {
      done();
    });
  });

  it("should return 200 OK for GET /api/books", async () => {
    const response = await request("http://localhost:5173")
      .get("/api/books")
      .expect(200);
    console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta 1");
  });

  it("should return 200 OK for GET /api/books", async () => {
    const response = await request("http://localhost:5173")
      .get("/api/books/info")
      .expect(200);
    console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta INFO");
  });

  it("should return 200 OK for GET /api/books", async () => {
    const response = await request("http://localhost:5173")
      .get("/api/books/crear")
      .expect(200);
    console.log("Response body:", response.body);
    expect(response.body).toHaveProperty("message", "Respuesta CREAR");
  });
});
