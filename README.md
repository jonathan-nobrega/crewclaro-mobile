# crewclaro-mobile

> **Hackathon demo repo.** Mock code for testing a multi-repo agent. Not affiliated with or endorsed by CrewClaro.

Field app for crews on the job site: translated chat, today's tasks, and photo uploads. Works offline and syncs when signal comes back.

## Stack
- React Native 0.76 + Expo SDK 52, Expo Router
- TypeScript
- WatermelonDB offline store + outbound queue
- Expo Notifications (push for new messages and task assignments)
- expo-speech / speech-to-text for voice messages
- `@crewclaro/api-types` (shared with `crewclaro-web`)

## Tabs
| Tab | What it does |
|---|---|
| Chat | Project chat in the user's language |
| Today | Tasks assigned to me, due today, grouped by project |
| Camera | Snap a photo, attach to a task, upload to S3 via presigned URL |

## Run
```bash
npm install
npx expo start
```
