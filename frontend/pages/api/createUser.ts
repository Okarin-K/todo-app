import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";

export async function createUser(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    return userCredential;
}
