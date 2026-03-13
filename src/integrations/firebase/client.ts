import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDNGGwJcCBoMHPXPY-J4pMcOOtVRQPevaM",
    authDomain: "cpc-projeto-app.firebaseapp.com",
    projectId: "cpc-projeto-app",
    storageBucket: "cpc-projeto-app.firebasestorage.app",
    messagingSenderId: "936471221499",
    appId: "1:936471221499:web:32a84776ac9f78afb58c5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with settings optimized for stability
// Using experimentalForceLongPolling to avoid network issues with WebSockets in some environments
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    }),
    experimentalForceLongPolling: true,
});

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
