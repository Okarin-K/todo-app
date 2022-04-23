import { VStack, Text, Spacer, Box, HStack, Stack } from '@chakra-ui/react';
import { useAuth } from '../pages/auth/authProvider';
import { Logout } from './buttons/logout';
import { ThemeToggler } from './themeToggler';

export function Navigation() {
    const authContext = useAuth();

    return (
        <HStack>
            <Spacer />
            <ThemeToggler />
            {authContext.user ? <Logout /> : <Box></Box>}
        </HStack>
    );
}
