import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chefai.vision',
  appName: 'ChefAI Vision',
  webDir: 'dist',
  server: {
    // ─── IMPORTANT ──────────────────────────────────────────────────────────
    // Replace this URL with your actual backend server address.
    // Options:
    //   • Local network:  'http://192.168.1.XXX:3001'  (find your PC's IP with ipconfig/ifconfig)
    //   • Cloud deployed: 'https://your-backend.railway.app'
    //   • Leave androidScheme as 'https' for Web Speech API to work (required by Chrome on Android)
    androidScheme: 'https',
    cleartext: true,   // allows HTTP (non-HTTPS) backend on local network
  },
  android: {
    allowMixedContent: true,   // needed if backend is HTTP
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    Microphone: {
      // Microphone permission is declared in AndroidManifest.xml (auto-added by Capacitor)
    },
    Camera: {
      // Camera permission is declared in AndroidManifest.xml (auto-added by Capacitor)
    },
  },
};

export default config;
