import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  List,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogout } from "../api/logout";
import { addTodo, getTodoList } from "../api/todoRepository";
import { Todo } from "../types/todo";
import { useAuth } from "./auth/authProvider";

export function TodoList() {
  const { logout } = useLogout();

  const [title, setTitle] = useState("");
  const [todoItems, setTodo] = useState<Todo[]>([]);

  const authContext = useAuth();

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
    const subscribe = async () =>
      getTodoList().then((todoList) => {
        if (todoList == undefined) {
          return;
        }

        setTodo(todoList as Todo[]);
      });

    console.log(todoItems);

    subscribe();
  }, []);

  return authContext.user ? (
    <Box>
      <Button
        type="submit"
        variant="solid"
        colorScheme="teal"
        width="full"
        onClick={logout}
      >
        Logout
      </Button>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <Heading color="teal.400">Todo List</Heading>
          <FormControl onClick={async () => onSubmit()}>
            <Input
              m={2}
              w={300}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Please input TODO..."
            />
            <Button
              type="submit"
              variant="solid"
              colorScheme="teal"
              _hover={{ bg: "green.300" }}
            >
              TODOを追加
            </Button>
          </FormControl>
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
        </Stack>
      </Flex>
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
