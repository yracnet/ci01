import { spawn } from "child_process";

export default function setup() {
  return new Promise((resolve, reject) => {
    console.log("[START] Starting server...");
    global.__TEST_SERVER__ = spawn("yarn", ["dev"], {
      stdio: "pipe",
      cwd: process.cwd(),
      shell: true,
    });
    global.__TEST_SERVER__.on("error", (err) => {
      console.error("[START] Error starting server:", err);
      reject(err);
    });
    global.__TEST_SERVER__.stdout.on("data", (data) => {
      const message = data.toString();
      if (message.includes("VITE")) {
        console.log("[START] Server started successfully.");
        resolve();
      }
    });
    global.__TEST_SERVER__.stderr.on("data", (data) => {
      console.error("[SERVER ERROR]", data.toString());
    });
  });
}
