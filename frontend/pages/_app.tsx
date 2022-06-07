import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, theme, ThemeProvider } from "@chakra-ui/react";
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../components/authProvider";

function MyApp({ Component, pageProps }: AppProps) {
    initializeApp(firebaseConfig);

    return (
        <ChakraProvider>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default MyApp;
