import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/initializeFirebase";

export const useSignup = () => {
  const navigate = useNavigate();

  const signup = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { signup };
};
