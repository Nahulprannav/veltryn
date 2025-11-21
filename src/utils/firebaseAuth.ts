type FirebaseUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
};

let _initialized = false;
let _auth: any = null;

function isConfigured() {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
}

async function ensureInitialized() {
  if (_initialized) return _auth;
  const { initializeApp } = await import('firebase/app');
  const { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth');
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  _initialized = true;
  _auth = { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };
  return _auth;
}

export async function signInWithGoogleFirebase(): Promise<FirebaseUser> {
  if (!isConfigured()) throw new Error('Firebase not configured');
  const fb = await ensureInitialized();
  const provider = new fb.GoogleAuthProvider();
  const result = await fb.signInWithPopup(fb.auth, provider);
  const u = result.user;
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL };
}

export async function signInWithGithubFirebase(): Promise<FirebaseUser> {
  if (!isConfigured()) throw new Error('Firebase not configured');
  const fb = await ensureInitialized();
  const provider = new fb.GithubAuthProvider();
  const result = await fb.signInWithPopup(fb.auth, provider);
  const u = result.user;
  return { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL };
}

export async function signUpWithEmailFirebase(email: string, password: string): Promise<FirebaseUser> {
  if (!isConfigured()) throw new Error('Firebase not configured');
  const fb = await ensureInitialized();
  const res = await fb.createUserWithEmailAndPassword(fb.auth, email, password);
  const u = res.user;
  return { uid: u.uid, email: u.email, displayName: u.displayName };
}

export async function signInWithEmailFirebase(email: string, password: string): Promise<FirebaseUser> {
  if (!isConfigured()) throw new Error('Firebase not configured');
  const fb = await ensureInitialized();
  const res = await fb.signInWithEmailAndPassword(fb.auth, email, password);
  const u = res.user;
  return { uid: u.uid, email: u.email, displayName: u.displayName };
}

export function firebaseEnabled() {
  return isConfigured();
}
