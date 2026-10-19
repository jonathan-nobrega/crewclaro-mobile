// Outbound queue for job sites with poor signal. Flushed on reconnect.
type Outbound =
  | { kind: "message"; projectId: string; body: string }
  | { kind: "taskStatus"; taskId: string; status: string }
  | { kind: "photo"; taskId: string; localUri: string };

const pending: Outbound[] = []; // TODO: persist in WatermelonDB

export async function enqueueOutbound(item: Outbound) {
  pending.push(item);
}

export async function flush(send: (item: Outbound) => Promise<void>) {
  while (pending.length) {
    const item = pending[0];
    await send(item);
    pending.shift();
  }
}
