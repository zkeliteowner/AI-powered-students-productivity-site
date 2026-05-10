# Productify - AI-Powered Student Productivity OS

Productify is a high-performance workspace for modern students, featuring AI-powered note-taking, smart scheduling, focus timers, and more.

## Features

- **AI Study OS**: Built-in Gemini AI for summarizing notes and generating study plans.
- **Bento Dashboard**: Unified interface for notes, tasks, and GPA tracking.
- **Pomodoro Timer**: focus sessions with ambient sounds.
- **Smart Timetable**: Dynamic lecture and study slot management.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Motion.
- **AI**: Google Gemini API.
- **Backend/Database**: Firebase (Auth & Firestore).

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   Copy `.env.example` to `.env` and fill in your keys:
   - `GEMINI_API_KEY`: Get it from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Firebase variables: Create a project at [Firebase Console](https://console.firebase.google.com/).

3. **Run the app**:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the following environment variables in the Vercel Dashboard:
   - `GEMINI_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_DATABASE_ID` (optional, defaults to '(default)')
4. Deployment command: `npm run build`, output directory: `dist`.

### Netlify

1. Push code to GitHub.
2. Connect to Netlify.
3. Configure the same environment variables as above.
4. Build settings: Build command `npm run build`, Publish directory `dist`.
