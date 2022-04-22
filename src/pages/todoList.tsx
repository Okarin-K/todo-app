import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { useLogout } from "../api/logout";
import { addTodo, getTodoList } from "../api/todoRepository";
import { auth } from "../services/initializeFirebase";
import { Todo } from "../types/todo";

export function TodoList() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [todoItems, setTodo] = useState<Todo[]>([]);

  const { logout } = useLogout();

  const onSubmit = async () => {
    if (title == undefined || title === "") {
      return;
    }

    addTodo(title)
      .then(() => {
        setTitle("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const subscribe = async () =>
      getTodoList().then((todoList) => {
        if (todoList == undefined) {
          return;
        }

        setTodo(todoList as Todo[]);
      });

    const dummy = () => {
      setTodo([]);
    };

    return () => {
      dummy();
    };
  }, []);

  return (
    <Flex
      justifyContent="center"
      flexFlow="column"
      width="100wh"
      height="100vh"
    >
      <Box>
        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
      <Heading color="teal.400">Todo List</Heading>
      <Box></Box>
      <form onClick={async () => onSubmit()}>
        <Input
          m={2}
          w={300}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please input TODO..."
        />
        <Button
          px="3"
          py="2"
          bg="green.200"
          rounded="md"
          _hover={{ bg: "green.300" }}
          type="submit"
        >
          TODOを追加
        </Button>
      </form>
      {todoItems.map((todo, index) => {
        return (
          <Box key={index}>
            <Checkbox textAlign="left" w="300px" m="2">
              {todo.title}
            </Checkbox>
          </Box>
        );
      })}
    </Flex>
  );
}
