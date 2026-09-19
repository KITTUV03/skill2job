import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from './firebase';
import { User } from '../types';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Normalizes a Firebase User and Firestore data into the application's standard User interface
 */
export function buildUserProfile(firebaseUser: FirebaseUser, firestoreData?: Partial<User>): User {
  return {
    id: firebaseUser.uid,
    name: firestoreData?.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Candidate',
    email: firebaseUser.email || '',
    avatar: firestoreData?.avatar || firebaseUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: firestoreData?.title || 'Candidate / Engineer',
    location: firestoreData?.location || '',
    savedJobIds: firestoreData?.savedJobIds || []
  };
}

/**
 * Register a new user with Firebase Auth and sync profile to Firestore
 */
export async function registerWithFirebase(name: string, email: string, pass: string): Promise<AuthResult> {
  if (!isFirebaseConfigured()) {
    // Graceful fallback to local API
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass })
      });
      const data = await res.json();
      if (data.success && data.user) {
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Registration failed' };
    } catch {
      return { success: false, error: 'Network error during registration' };
    }
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });

    const newUserProfile: User = {
      id: cred.user.uid,
      name,
      email: cred.user.email || email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Candidate / Engineer',
      location: '',
      savedJobIds: []
    };

    // Store user profile securely in Firestore
    try {
      const userRef = doc(db, 'users', cred.user.uid);
      await setDoc(userRef, {
        ...newUserProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (firestoreErr) {
      console.warn('Firestore profile creation warning (will fallback to Auth profile):', firestoreErr);
    }

    return { success: true, user: newUserProfile };
  } catch (err: any) {
    let msg = err.message || 'Firebase registration failed';
    if (err.code === 'auth/email-already-in-use') {
      msg = 'This email address is already registered. Please log in.';
    } else if (err.code === 'auth/weak-password') {
      msg = 'Password should be at least 6 characters.';
    } else if (err.code === 'auth/invalid-email') {
      msg = 'Invalid email address provided.';
    }
    return { success: false, error: msg };
  }
}

/**
 * Sign in user with email & password via Firebase Auth
 */
export async function loginWithFirebase(email: string, pass: string): Promise<AuthResult> {
  if (!isFirebaseConfigured()) {
    // Graceful fallback to local API
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (data.success && data.user) {
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch {
      return { success: false, error: 'Network error during authentication' };
    }
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    let firestoreData: any = {};
    
    try {
      const userRef = doc(db, 'users', cred.user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        firestoreData = snap.data();
      }
    } catch (firestoreErr) {
      console.warn('Firestore fetch warning:', firestoreErr);
    }

    const userProfile = buildUserProfile(cred.user, firestoreData);
    return { success: true, user: userProfile };
  } catch (err: any) {
    let msg = err.message || 'Sign in failed';
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      msg = 'Invalid email or password. Please verify credentials or create an account.';
    } else if (err.code === 'auth/too-many-requests') {
      msg = 'Access temporarily disabled due to multiple failed attempts. Reset your password or try again shortly.';
    }
    return { success: false, error: msg };
  }
}

/**
 * Sign in user with Google SSO via Firebase Auth
 */
export async function loginWithFirebaseGoogle(): Promise<AuthResult> {
  if (!isFirebaseConfigured()) {
    // Fallback demo profile for local testing
    return {
      success: true,
      user: {
        id: `usr-google-${Date.now()}`,
        name: 'Google Candidate',
        email: 'candidate.google@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Candidate / Engineer',
        location: '',
        savedJobIds: []
      }
    };
  }

  try {
    const cred = await signInWithPopup(auth, googleProvider);
    let firestoreData: any = {};

    try {
      const userRef = doc(db, 'users', cred.user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        firestoreData = snap.data();
      } else {
        // Save initial Google profile to Firestore
        const newProfile = buildUserProfile(cred.user);
        await setDoc(userRef, {
          ...newProfile,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });
        firestoreData = newProfile;
      }
    } catch (fsErr) {
      console.warn('Firestore Google profile sync warning:', fsErr);
    }

    const userProfile = buildUserProfile(cred.user, firestoreData);
    return { success: true, user: userProfile };
  } catch (err: any) {
    return { success: false, error: err.message || 'Google sign in was cancelled or failed' };
  }
}

/**
 * Sign out user from Firebase Auth
 */
export async function logoutFirebase(): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Error signing out of Firebase:', e);
    }
  }
}

/**
 * State Observer: Listens to Firebase Auth state changes and syncs Firestore profile
 */
export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  if (!isFirebaseConfigured()) {
    // No-op unsubscribe for local fallback
    return () => {};
  }

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      let firestoreData: any = {};
      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          firestoreData = snap.data();
        }
      } catch (e) {
        console.warn('Failed to load user document from Firestore:', e);
      }

      const userProfile = buildUserProfile(firebaseUser, firestoreData);
      callback(userProfile);
    } else {
      callback(null);
    }
  });

  return unsubscribe;
}

/**
 * Save / Update user profile to Firestore
 */
export async function syncUserProfileToFirestore(userId: string, data: Partial<User>): Promise<void> {
  if (!isFirebaseConfigured() || !userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.warn('Failed to sync profile update to Firestore:', e);
  }
}
