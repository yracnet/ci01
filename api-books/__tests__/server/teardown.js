// export default function teardown() {
//   global.__TEST_SERVER__.kill("SIGINT");
//   console.log("[Server]:", "STOP");
// }
export default function stopServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = global.__TEST_SERVER__;
    if (!serverProcess) {
      console.log("No server process to stop.");
      resolve();
      return;
    }

    console.log("Stopping server...");
    serverProcess.kill("SIGINT");
    serverProcess.kill("SIGINT");

    serverProcess.on("exit", (code, signal) => {
      console.log(
        `Server process exited with code ${code} and signal ${signal}.`
      );
      global.__TEST_SERVER__ = null;
      resolve();
    });

    serverProcess.on("error", (err) => {
      console.error("Error stopping server:", err);
      reject(err);
    });
  });
}
