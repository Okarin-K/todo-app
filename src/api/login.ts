import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/initializeFirebase";

export const useLogin = () => {
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeout(() => {
          navigate("/todos");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { login };
};
