import { Box, Button, Heading, Link, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useLogin } from '../../api/useLogIn';
import { Email } from '../../components/form/email';
import { Password } from '../../components/form/password';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useLogin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login(email, password);
    };

    return (
        <VStack h="100vh" justify={'center'}>
            <Heading color="teal.400">Login</Heading>
            <Box minW={{ base: '90%', md: '468px' }}>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                        <Email onChange={(e) => setEmail(e.target.value)} />
                        <Password onChange={(e) => setPassword(e.target.value)} />
                        <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full" onClick={() => login}>
                            Login
                        </Button>
                    </VStack>
                </form>
            </Box>
            <Box>
                登録はこちら{' '}
                <Link color="teal.500" href="/signUp">
                    Sign Up
                </Link>
            </Box>
        </VStack>
    );
};

export default Login;
