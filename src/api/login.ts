import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/initializeFirebase";

export const useLogin = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const [error, setError] = useState(null);

  const login = (email: string, password: string) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/todos");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, login };
};
