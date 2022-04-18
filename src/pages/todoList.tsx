import { Box, Button, Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import { FormEvent, useEffect, useState } from 'react';
import { addTodo, getTodoList } from '../api/todoRepository';
import { Todo } from '../types/todo';

export function TodoList() {
    const [title, setTitle] = useState('');
    const [todoItems, setTodo] = useState<Todo[]>([]);

    const onSubmit = async () => {
        if(title == undefined || title === '') {
            return;
        }

        addTodo(title).then(() => {
            setTitle('');
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
            const subscribe = async () => getTodoList().then(todoList => {
                if(todoList == undefined) {
                    return;
                }

                setTodo(todoList as Todo[]);
            });

            return () => { subscribe() }
    }, []);
  
    return <div>
        <Text fontSize='6xl' fontFamily='sans-serif'>Todo List</Text>
            <form onClick={async () => onSubmit()}>
                <Input m={2} w={300} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please input TODO...' />
                <Button
                    px='3'
                    py='2'
                    bg='green.200'
                    rounded='md'
                    _hover={{ bg: 'green.300' }}
                    type="submit"

                >
                    TODOを追加
                </Button>
            </form>
            <Flex justifyContent='center' flexFlow='column'>
                {todoItems.map((todo, index) => {
                    return <Box key={index}><Checkbox textAlign='left' w='300px' m='2'>{todo.title}</Checkbox></Box>
                })}
            </Flex>
    </div>
}