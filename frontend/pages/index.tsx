import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Router from "next/router";

const Home: NextPage = () => {
    return (
        <VStack justify="center" height="100vh">
            <Heading>My Todo</Heading>
            <Button type="button" colorScheme="green" onClick={(e) => Router.push("/signup")}>
                Sign Up
            </Button>
            <Button type="button" colorScheme="blue" onClick={(e) => Router.push("/signin")}>
                Sign In
            </Button>
        </VStack>
    );
};

export default Home;
