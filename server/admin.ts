import { loadConfig } from "./config";
import { openStore } from "./store";
const [command, id, evidence, amount] = process.argv.slice(2);
if (!command || command === "--help") {
  console.log('Usage: npm run orders -- list | show ORDER_ID | approve ORDER_ID "verification evidence" | reject ORDER_ID "reason" | confirm-venmo ORDER_ID VENMO_TRANSACTION_ID AMOUNT_CENTS | recover-access ORDER_ID "verified ownership evidence"');
} else {
  const store = openStore(loadConfig().dbPath);
  try {
    if (command === "list") console.log(JSON.stringify(store.listPending(), null, 2));
    else if (command === "show") console.log(JSON.stringify(store.get(id), null, 2));
    else if (["approve", "reject"].includes(command)) console.log(JSON.stringify(store.review(id, command === "approve", evidence || ""), null, 2));
    else if (command === "confirm-venmo") console.log(JSON.stringify(store.markPaid(id, "venmo", Number(amount), evidence || ""), null, 2));
    else if (command === "recover-access") console.log(JSON.stringify(store.recoverAccess(id, evidence || ""), null, 2));
    else throw new Error("Unknown command. Use --help.");
  } finally { store.close(); }
}
