import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/initializeFirebase";

export const useSignup = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const [error, setError] = useState(null);

  const signup = (email: string, password: string) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, signup };
};
