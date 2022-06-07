import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

export async function signOut(): Promise<void> {
    const auth = getAuth();
    await firebaseSignOut(auth);
}
