import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/initializeFirebase";

export const useLogout = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const [error, setError] = useState(null);

  const logout = () => {
    setError(null);
    signOut(auth)
      .then(() => {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, logout };
};
