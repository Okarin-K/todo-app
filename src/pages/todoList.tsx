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
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLogout } from "../api/logout";
import { addTodo, getTodoList } from "../api/todoRepository";
import { auth } from "../services/initializeFirebase";
import { Todo } from "../types/todo";

export function TodoList() {
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

  return (
    <Box>
      <Flex direction={"row-reverse"}>
        <Stack>
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            colorScheme="teal"
            onClick={logout}
          >
            Logout
          </Button>
        </Stack>
      </Flex>
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
    </Box>
  );
}
