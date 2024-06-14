const request = require("supertest");
const crossSpawn = require("cross-spawn");
const { spawn } = require("child_process");
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
  });

  afterAll((done) => {
    serverProcess.kill();
    serverProcess.on("exit", () => {
      console.log("Server process terminated");
      done();
    });
  });

  it("should return 200 OK for GET /api/books", async () => {
    const response = await request("http://localhost:5173")
      .get("/api/books")
      .expect(200);
    console.log("BODY::::::::", response.body);
    expect(response.body).toHaveProperty("message", "Hola");
  });
});
