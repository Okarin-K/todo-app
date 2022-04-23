import { FormControl, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';

export function Email({ onChange }: { onChange: ChangeEventHandler<HTMLInputElement> }) {
    const [emailError, setEmailError] = useState<boolean>(false);

    return (
        <FormControl isRequired isInvalid={emailError}>
            <Input
                type="email"
                placeholder="e-mail"
                onChange={(e) => {
                    onChange(e);
                    setEmailError(e.target.value === '');
                }}
                _placeholder={{ color: 'gray.400' }}
                variant="outline"
            />
        </FormControl>
    );
}
