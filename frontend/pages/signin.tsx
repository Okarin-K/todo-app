import { Box, Button, FormControl, Heading, Input, InputGroup, InputRightElement, Stack, VStack } from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import { createUser } from "./api/createUser";
import { signIn } from "./api/signin";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const _credential = await signIn(email, password);
        Router.push("/todos");
    };

    return (
        <VStack h="100vh" justify={"center"}>
            <Heading color="teal.400">Sign In</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                        <Input type="email" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FormControl>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button type="submit" borderRadius={0} variant="solid" colorScheme="blue">
                            Sign In
                        </Button>
                        <Button type="button" borderRadius={0} variant="solid" colorScheme="green" onClick={(e) => Router.push("/")}>
                            Back
                        </Button>
                    </Stack>
                </form>
            </Box>
        </VStack>
    );
};

export default Signin;
