import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signUp";
import { TodoList } from "./pages/todoList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
function setUser(currentUser: import("@firebase/auth").User | null) {
  throw new Error("Function not implemented.");
}
