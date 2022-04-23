import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navigatoin';
import { AuthProvider } from './pages/auth/authProvider';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signUp';
import { TodoList } from './pages/todoList';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/todos" element={<TodoList />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
