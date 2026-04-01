# ChefAI Vision — APK Build Guide
## Complete step-by-step instructions to turn your web app into an Android APK

---

## 📋 What You Need (Install These First)

| Tool | Download | Why |
|------|----------|-----|
| **Node.js 18+** | https://nodejs.org | Runs the build |
| **Android Studio** | https://developer.android.com/studio | Builds the APK |
| **JDK 17** | Bundled with Android Studio | Java runtime |
| **Git** | https://git-scm.com | Optional, for version control |

> ⚠️ Android Studio is required even if you only want a .apk file. It provides the Android SDK and Gradle build tools that Capacitor needs.

---

## 🚀 Step-by-Step Build Process

### STEP 1 — Set up your backend URL

Before building, open `frontend/capacitor.config.ts` and set your backend address:

```typescript
server: {
  // Option A — local network (phone + PC on same WiFi):
  // Find your PC's IP: run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
  androidScheme: 'https',
  cleartext: true,
}
```

Then open `frontend/src/CookingAssistant.jsx` and find this line near the top:

```javascript
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001")
```

Create `frontend/.env` with your backend IP:
```
VITE_API_BASE_URL=http://192.168.1.XXX:3001
```
Replace `192.168.1.XXX` with your PC's actual local IP address.

---

### STEP 2 — Install dependencies

Open a terminal in the `frontend/` folder:

```bash
cd frontend
npm install
```

This installs React, Vite, and the Capacitor packages needed for Android.

---

### STEP 3 — Build the web app

```bash
npm run build
```

This creates the `frontend/dist/` folder — the compiled web app that Capacitor wraps into Android.

---

### STEP 4 — Initialize Capacitor (first time only)

```bash
npx cap init "ChefAI Vision" "com.chefai.vision" --web-dir dist
```

> Skip this if `capacitor.config.ts` already exists (it's included in this package).

---

### STEP 5 — Add the Android platform (first time only)

```bash
npx cap add android
```

This generates the `android/` folder with a full Gradle project.

---

### STEP 6 — Sync your web app into Android

```bash
npx cap sync android
```

Run this every time you change your React code. It copies `dist/` into the Android project.

---

### STEP 7 — Open Android Studio

```bash
npx cap open android
```

Android Studio will open the project. Wait for Gradle to finish syncing (progress bar at the bottom).

---

### STEP 8 — Build the APK in Android Studio

1. In the menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for the build to complete (~2–5 minutes)
3. Click **"locate"** in the notification that appears, or find your APK at:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

### STEP 9 — Install on your Android phone

**Option A — USB cable:**
1. Enable Developer Options on your phone: Settings → About Phone → tap "Build Number" 7 times
2. Enable USB Debugging: Settings → Developer Options → USB Debugging
3. Connect phone via USB
4. In Android Studio: **Run → Run 'app'** (select your phone from the device list)

**Option B — Transfer the APK file:**
1. Copy `app-debug.apk` to your phone (via USB, Google Drive, email, etc.)
2. On your phone: Settings → Security → enable "Install unknown apps" for your file manager
3. Open the APK file and tap Install

---

## 🎤 Microphone Fix Summary

The mic was looping (turning on/off every 3–5 seconds) because of 3 bugs that have now been fixed:

### What was wrong:
1. **No single-instance guard** — the code could create multiple mic objects simultaneously
2. **`onend` had a race condition** — if the browser called `onend` twice quickly (which Chrome does on silence), two restart timers would race each other
3. **`stopCamera()` didn't signal the mic to stop permanently** — so the mic would restart even after navigating away from the recipe screen

### What was fixed (matches the production pattern):

```javascript
// ✅ ONE instance — if ref exists, don't create another
if (recognitionRef.current) return;

// ✅ continuous: true — keeps listening without silence timeouts
recognition.continuous = true;

// ✅ onend restarts ONLY if the ref still exists
// Clearing the ref in stopMicListening() is the stop signal
recognition.onend = () => {
  if (recognitionRef.current) {
    setTimeout(() => {
      if (recognitionRef.current) recognition.start();
    }, 250);
  }
};

// ✅ onresult NEVER calls stop()/start() — that was the loop cause
recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  handleVoiceCommand(transcript);
};

// ✅ stopMicListening clears ref FIRST so onend sees it and skips restart
const stopMicListening = () => {
  const rec = recognitionRef.current;
  recognitionRef.current = null;  // signal: don't restart
  rec?.stop();
};
```

---

## 📁 File Reference

```
COOKING ASSISTANT v11/
├── frontend/
│   ├── src/
│   │   └── CookingAssistant.jsx    ← ✅ Mic fix applied here
│   ├── capacitor.config.ts         ← ✅ NEW — Capacitor/APK config
│   ├── package.json                ← ✅ UPDATED — Capacitor packages added
│   └── .env                        ← Create this with your backend IP
├── backend/
│   └── server.js                   ← Unchanged
└── APK-BUILD-GUIDE.md              ← This file
```

---

## 🔧 Running the Backend (Required for AI Features)

The app needs the backend running for:
- AI vision analysis
- Voice TTS (ElevenLabs)
- Recipe API calls

**Start backend:**
```bash
cd backend
npm install
npm run dev
```

**Required `.env` in `backend/`:**
```
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=...        (optional — for realistic voice)
PORT=3001
```

---

## 🛑 Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| `JAVA_HOME not set` | Open Android Studio, install JDK 17 from SDK Manager |
| `SDK location not found` | In Android Studio: SDK Manager → note the SDK path → add to system PATH |
| `Mic not working in APK` | Permissions are declared in AndroidManifest.xml automatically by Capacitor |
| `Can't reach backend` | Make sure phone and PC are on the same WiFi network |
| `App crashes on open` | Check that `VITE_API_BASE_URL` in `.env` matches your PC's IP |
| `Build fails with Gradle error` | File → Invalidate Caches and Restart in Android Studio |

---

## ⚡ Quick Re-build After Code Changes

```bash
cd frontend
npm run build          # rebuild React app
npx cap sync android   # sync into Android project
# Then in Android Studio: Build → Build APK(s)
```

Or use the shortcut script:
```bash
npm run build:apk      # runs both commands above
```

---

*Built with React + Vite + Capacitor 6*
