import {
    FormControl,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';

export function Password({
    onChange,
}: {
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const color = useColorModeValue('gray.800', 'gray.800');

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <FormControl isRequired isInvalid={passwordError}>
            <InputGroup>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    _placeholder={{ color: 'gray.400' }}
                    variant="outline"
                    onChange={(e) => {
                        onChange(e);
                        setPasswordError(e.target.value === '');
                    }}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? (
                            <Text color={color}>Hide</Text>
                        ) : (
                            <Text color={color}>Show</Text>
                        )}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
}
