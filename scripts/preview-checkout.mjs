import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const child = spawn(process.execPath, [fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)), "dev", "--webpack", "--hostname", "127.0.0.1", "--port", "3015"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_CHECKOUT_PREVIEW: "true" },
});
child.on("exit", code => process.exit(code ?? 1));
child.on("error", error => { console.error(error.message); process.exit(1); });
