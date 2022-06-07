import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export async function signIn(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    const UserCredential = signInWithEmailAndPassword(auth, email, password);

    return UserCredential;
}
