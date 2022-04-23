import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';

export const ThemeToggler = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box py={4} mr={12}>
            <IconButton
                aria-label="toggleColorMode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
            />
        </Box>
    );
};
