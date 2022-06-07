import { Box, Button, HStack } from "@chakra-ui/react";
import Router from "next/router";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Box>{children}</Box>
        </>
    );
};
