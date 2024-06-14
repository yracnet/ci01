import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { Transform } from "stream";

function stripAnsi(str) {
  return str.replace(
    /[\u001b\u009b][[\]()#;?]*(?:(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])/g,
    ""
  );
}

class StripAnsiStream extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(stripAnsi(chunk.toString()));
    callback();
  }
}

export default function setup() {
  return new Promise((resolve, reject) => {
    console.log("[START] Starting server...");
    const logDir = path.resolve("./__tests__/logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFile = fs.createWriteStream(path.join(logDir, "server.log"), {
      flags: "a",
    });

    const child = spawn("yarn", ["dev"], {
      stdio: "pipe",
      cwd: process.cwd(),
      shell: true,
    });
    global.__TEST_SERVER__ = child;
    const stripAnsiStream = new StripAnsiStream();
    child.stdout.pipe(stripAnsiStream).pipe(logFile);
    child.stderr.pipe(stripAnsiStream).pipe(logFile);

    child.on("error", (err) => {
      console.error("[START] Error starting server:", err);
      reject(err);
    });
    child.stdout.on("data", (data) => {
      const message = data.toString();
      if (message.includes("VITE")) {
        console.log("[START] Server started successfully.");
        resolve();
      }
    });
    child.stderr.on("data", (data) => {
      console.error("[SERVER ERROR]", data.toString());
    });
  });
}
