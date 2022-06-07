import { VStack, Heading, HStack, Input, Button, List, ListItem, Checkbox, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore/lite";
import { addTodo } from "./api/todo/addTodo";
import { LoginState, useLoginState } from "../hooks/useLoginState";
import { signOut } from "./api/signOut";
import Router from "next/router";
import { getTodoList } from "./api/todo/getTodoList";
import { UseAuth } from "../components/authProvider";

export type Todo = {
    title: string;
    completed: boolean;
    created_at: Timestamp;
};

export function Todos() {
    const authContext = UseAuth();

    const [title, setTitle] = useState("");
    const [todoList, setTodo] = useState<Todo[]>([]);

    useEffect(() => {
        const unsubscribe = async () => {
            if (authContext.user === null) {
                console.log("認証情報が見つかりません");
                return;
            }

            const todoList = await getTodoList(authContext.user);

            setTodo(todoList);
        };

        unsubscribe();
    }, []);

    return (
        <>
            {authContext.user !== null ? (
                <VStack>
                    <Heading color="teal.400">Todo List</Heading>
                    <Button
                        onClick={async (e) => {
                            await signOut();
                            Router.push("/");
                        }}
                    >
                        Sign Out
                    </Button>
                    <form
                        onClick={(e) => {
                            e.preventDefault();

                            if (!title) {
                                return;
                            }

                            if (authContext.user === null) {
                                return;
                            }

                            addTodo(authContext.user, title);
                            setTitle("");
                        }}
                    >
                        <HStack>
                            <Input
                                m={2}
                                w={300}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Please input TODO..."
                            />
                            <Button type="submit" variant="solid" colorScheme="teal" _hover={{ bg: "green.300" }}>
                                ADD
                            </Button>
                        </HStack>
                    </form>
                    <List>
                        {todoList.map((todo, index) => {
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
                <HStack justify="center" height="100vh">
                    <Spinner color="red.500" />
                </HStack>
            )}
        </>
    );
}

export default Todos;
