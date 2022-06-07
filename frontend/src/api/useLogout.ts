import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/initializeFirebase';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return { logout };
};
