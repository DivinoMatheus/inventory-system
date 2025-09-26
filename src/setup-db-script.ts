import { setupDb } from "./setup-db";

async function setupDbScript() {
  await setupDb();
  process.exit(0);
}

setupDbScript()