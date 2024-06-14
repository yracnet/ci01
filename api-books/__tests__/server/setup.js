import { spawn } from "child_process";

export default function startServer() {
  return new Promise((resolve, reject) => {
    const root = process.cwd();
    //console.log("Current working directory:", root);
    const child = spawn("yarn", ["dev"], {
      cwd: root,
      shell: true,
    });
    global.__TEST_SERVER__ = child;
    child.stdout.on("data", (data) => {
      const text = data.toString();
      console.log("[Server]:", text);
      if (text.includes("ready")) {
        setTimeout(resolve, 500);
      }
    });

    child.stderr.on("data", (data) => {
      reject(data);
    });
  });
}
