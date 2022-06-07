import { getAuth, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
    user: User | null;
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user }}>{!loading && children}</AuthContext.Provider>;
};

export const UseAuth = () => {
    return useContext(AuthContext);
};
