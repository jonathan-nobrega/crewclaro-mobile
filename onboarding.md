# crewclaro-mobile onboarding

The CrewClaro field app for crews on the job site. Workers use it to chat with the team in their own language, see today's tasks, and attach photos to tasks. It is built to keep working with poor signal and sync when the connection comes back.

## Where it fits
- **Calls:** `crewclaro-api` over REST (`/v1/*`) and WebSocket (`/realtime`).
- **Shares types with:** `crewclaro-web`, via `@crewclaro/api-types`.
- **Uploads photos to:** S3 via presigned URLs (bucket provisioned by `crewclaro-infra`).

## Stack
React Native 0.76, Expo SDK 52 with Expo Router, TypeScript, WatermelonDB (offline store), Expo Notifications, expo-camera, expo-speech for voice messages.

## Run locally
```bash
npm install
npx expo start        # or: npm run ios / npm run android
```
The API URL is set in `app.json` under `expo.extra.apiUrl` (default `http://localhost:4000/v1`). On a physical device, change `localhost` to your machine's LAN IP.

## Code map
| Path | What's there |
|---|---|
| `app/(tabs)/chat.tsx` | Project chat in the user's language |
| `app/(tabs)/today.tsx` | Tasks assigned to me, due today, grouped by project |
| `app/(tabs)/camera.tsx` | Take a photo, attach it to a task, upload to S3 |
| `src/lib/api.ts` | REST calls; failed sends fall back to the offline queue |
| `src/offline/queue.ts` | Outbound queue (messages, task status, photos), flushed on reconnect |

## Gotchas
- The offline queue is in memory only (`TODO: persist in WatermelonDB`). Anything queued is lost if the app is killed.
- `myTasksToday()` calls `/projects/_all/tasks?assignee=me&due=today`, which isn't in `crewclaro-api`'s documented endpoints. Check the API before relying on it.
- When a send fails, `sendMessage()` returns `null` and the UI shows the message as "queued".
