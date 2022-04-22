import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "../services/initializeFirebase";

export const addTodo = async (title: string) => {
  const docData = {
    title: title,
    completed: false,
    time: Timestamp.fromDate(new Date()),
  };

  await addDoc(collection(db, "todo"), docData);
};

export const getTodoList = async () => {
  const snapshot = await getDocs(
    query(collection(db, "todo"), orderBy("time"))
  );

  const todoList: DocumentData[] = [];
  snapshot.docs.forEach((doc) => todoList.push({ ...doc.data() }));

  return todoList;
};
