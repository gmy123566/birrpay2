import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User as FirebaseUser,
  sendPasswordResetEmail,
  deleteUser,
  signInWithEmailAndPassword as signInForCleanup
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User } from '../types/user';

const ADMIN_EMAIL = 'support@admin.birr-pay.com';

// Helper function to clean up existing admin data
async function cleanupExistingAdmin() {
  try {
    // Query for users with admin role
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'admin'));
    const querySnapshot = await getDocs(q);
    
    // Delete each admin user document and auth account
    const deletePromises = querySnapshot.docs.map(async (docSnapshot) => {
      const userData = docSnapshot.data();
      // Delete from Firestore
      await deleteDoc(doc(db, 'users', docSnapshot.id));
      
      // Try to delete the auth account if it exists
      try {
        const userCredential = await signInForCleanup(auth, userData.email, 'oldpassword');
        await deleteUser(userCredential.user);
      } catch (error) {
        // Ignore auth cleanup errors as the auth user might not exist
        console.log('Auth cleanup skipped:', error);
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error cleaning up admin data:', error);
  }
}

export async function registerUser(email: string, password: string, name: string): Promise<User> {
  try {
    const isAdmin = email === ADMIN_EMAIL;

    if (isAdmin) {
      // Clean up any existing admin data
      await cleanupExistingAdmin();
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user: firebaseUser } = userCredential;

    // Create user document in Firestore
    const userData: User = {
      id: firebaseUser.uid,
      email: email,
      name: name,
      status: 'Active',
      subscriptions: 0,
      role: isAdmin ? 'admin' : 'user'
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    // Send verification email for admin
    if (isAdmin) {
      await sendVerificationEmail(firebaseUser);
      throw new Error('Please verify your email address. A verification link has been sent.');
    }

    return userData;
  } catch (error: any) {
    let message = error.message;
    if (error.code === 'auth/email-already-in-use') {
      message = 'This email is already registered. Please try logging in instead.';
    }
    throw new Error(message);
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user: firebaseUser } = userCredential;

    // For admin, check email verification
    if (email === ADMIN_EMAIL && !firebaseUser.emailVerified) {
      await sendVerificationEmail(firebaseUser);
      throw new Error('Please verify your email address. A new verification link has been sent.');
    }

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    return userDoc.data() as User;
  } catch (error: any) {
    let message = error.message;
    if (error.code === 'auth/wrong-password') {
      message = 'Invalid email or password';
    } else if (error.code === 'auth/user-not-found') {
      message = 'No account found with this email';
    }
    throw new Error(message);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error('Failed to log out. Please try again.');
  }
}

export async function sendVerificationEmail(user: FirebaseUser): Promise<void> {
  try {
    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true
    };
    await sendEmailVerification(user, actionCodeSettings);
  } catch (error: any) {
    throw new Error('Failed to send verification email. Please try again later.');
  }
}

export async function resendVerificationEmail(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await sendVerificationEmail(userCredential.user);
  } catch (error: any) {
    throw new Error('Failed to resend verification email. Please check your credentials.');
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error('Failed to send password reset email. Please try again later.');
  }
}

export function isAdminEmail(email: string): boolean {
  return email === ADMIN_EMAIL;
}