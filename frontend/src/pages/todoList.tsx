import { Button, Checkbox, Heading, HStack, Input, List, ListItem, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addTodo } from '../api/dataAccess/addTodo';
import { getTodoList } from '../api/dataAccess/getTodoList';
import { Todo } from '../types/todo';
import { useAuth } from './auth/authProvider';

export function TodoList() {
    const [title, setTitle] = useState('');
    const [todoItems, setTodo] = useState<Todo[]>([]);

    const authContext = useAuth();

    const onSubmit = async () => {
        if (title == undefined || title === '') {
            return;
        }

        addTodo(title)
            .then(() => setTitle(''))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const subscribe = () => {
            getTodoList().then((data) => {
                setTodo(data);
            });
        };

        return () => subscribe();
    }, []);

    return authContext.user ? (
        <VStack>
            <Heading color="teal.400">Todo List</Heading>
            <form onClick={async () => onSubmit()}>
                <HStack>
                    <Input
                        m={2}
                        w={300}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Please input TODO..."
                    />
                    <Button type="submit" variant="solid" colorScheme="teal" _hover={{ bg: 'green.300' }}>
                        ADD
                    </Button>
                </HStack>
            </form>
            <List>
                {todoItems.map((todo, index) => {
                    return (
                        <ListItem key={index}>
                            <Checkbox textAlign="left" w="300px" m="2">
                                {todo.title}
                            </Checkbox>
                        </ListItem>
                    );
                })}
            </List>
        </VStack>
    ) : (
        <Navigate to="/" />
    );
}
