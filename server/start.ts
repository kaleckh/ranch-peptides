import { loadConfig } from "./config";
import { openStore } from "./store";
import { createCheckoutServer } from "./api";
const config = loadConfig();
const store = openStore(config.dbPath);
const server = createCheckoutServer(config, store);
server.listen(config.port, () => console.log(`Checkout API listening on ${config.port}; checkout ${config.enabled ? "enabled" : "disabled"}`));
for (const signal of ["SIGINT", "SIGTERM"] as const) process.on(signal, () => server.close(() => { store.close(); process.exit(0); }));
