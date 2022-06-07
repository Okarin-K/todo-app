import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useSignUp } from '../../api/useSignUp';
import { Email } from '../../components/form/email';
import { Password } from '../../components/form/password';

const SignUp = () => {
    const { signup } = useSignUp();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        signup(email, password);
    };

    return (
        <VStack h="100vh" justify={'center'}>
            <Heading color="teal.400">Sign Up</Heading>
            <Box minW={{ base: '90%', md: '468px' }}>
                <form onSubmit={handleSubmit}>
                    <VStack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                    >
                        <Email onChange={(e) => setEmail(e.target.value)} />
                        <Password
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            borderRadius={0}
                            type="submit"
                            variant="solid"
                            colorScheme="teal"
                            width="full"
                            onClick={() => signup}
                        >
                            Sign Up
                        </Button>
                    </VStack>
                </form>
            </Box>
        </VStack>
    );
};

export default SignUp;
