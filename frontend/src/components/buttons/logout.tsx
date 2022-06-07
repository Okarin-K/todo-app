import { Button, HStack, Spacer } from '@chakra-ui/react';
import { useLogout } from '../../api/useLogout';

export function Logout() {
    const { logout } = useLogout();

    return (
        <HStack spacing={1}>
            <Spacer />
            <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                onClick={logout}
            >
                Logout
            </Button>
        </HStack>
    );
}
