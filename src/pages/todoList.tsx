import { Box, Button, Checkbox, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { Todo } from '../types/todo';

export function TodoList() {
    const [title, setTitle] = useState('');

  const [todoItems, setTodo] = useState<Todo[]>([]);

  const addTodo = (value: string) => {
    const todo = [...todoItems];
    
    todo.push({
      title: value,
      completed: false
    });

    setTodo(todo);
    setTitle('');
  }

  const updateTodo = (index: number) => {
    const todoList = todoItems;
    todoList[index].completed = !todoList[index].completed
    
    setTodo(todoList);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
  }
  
    return <div>
        <Text fontSize='6xl' fontFamily='sans-serif'>Todo List</Text>
            <form onSubmit={handleSubmit}>
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
                    return <Box><Checkbox textAlign='left' w='300px' m='2' onClick={() => updateTodo(index)}>{todo.title}</Checkbox></Box>
                })}
            </Flex>
    </div>
}