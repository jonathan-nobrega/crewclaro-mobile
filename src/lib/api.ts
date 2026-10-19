import Constants from "expo-constants";
import type { Message, Task, Paginated } from "@crewclaro/api-types";
import { enqueueOutbound } from "../offline/queue";

const API = Constants.expoConfig?.extra?.apiUrl as string;

export async function listMessages(projectId: string, lang: string) {
  const r = await fetch(`${API}/projects/${projectId}/messages?lang=${lang}`);
  return (await r.json()) as Paginated<Message>;
}

export async function sendMessage(projectId: string, body: string) {
  try {
    const r = await fetch(`${API}/projects/${projectId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    return (await r.json()) as Message;
  } catch {
    await enqueueOutbound({ kind: "message", projectId, body });
    return null; // shown as "queued" in UI
  }
}

export async function myTasksToday() {
  const r = await fetch(`${API}/projects/_all/tasks?assignee=me&due=today`);
  return (await r.json()) as Paginated<Task>;
}
