import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore/lite";
import { firestoreDB } from "../services/initializeFirebase";

export const addTodo = async (title: string) => {
  const docData = {
    title: title,
    completed: false,
    time: Timestamp.fromDate(new Date()),
  };

  await addDoc(collection(firestoreDB, "todo"), docData);
};

export const getTodoList = async () => {
  const snapshot = await getDocs(
    query(collection(firestoreDB, "todo"), orderBy("time"))
  );

  const todoList: DocumentData[] = [];
  snapshot.docs.forEach((doc) => todoList.push({ ...doc.data() }));

  return todoList;
};
