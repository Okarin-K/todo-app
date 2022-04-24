import { Box, HStack, Spacer } from '@chakra-ui/react';
import { UseAuth } from '../pages/auth/authProvider';
import { Logout } from './buttons/logout';
import { ThemeToggler } from './themeToggler';

export function Navigation() {
    const authContext = UseAuth();

    return (
        <HStack>
            <Spacer />
            <ThemeToggler />
            {authContext.user ? <Logout /> : <Box></Box>}
        </HStack>
    );
}
