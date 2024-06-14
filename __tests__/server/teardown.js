export default function stopServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = global.__TEST_SERVER__;
    if (!serverProcess) {
      console.log("[STOP] No server process to stop.");
      resolve();
    } else {
      console.log("[STOP] Stopping server...");
      serverProcess.kill("SIGINT");
      serverProcess.kill("SIGINT");
      serverProcess.kill("SIGKILL");
      serverProcess.on("exit", (code, signal) => {
        resolve();
        process.exit(0);
      });
      serverProcess.on("error", (err) => {
        console.error("[STOP] Error stopping server:", err);
        reject(err);
      });
    }
  });
}
