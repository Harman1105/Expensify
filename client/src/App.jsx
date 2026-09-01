import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Savings from "./pages/Savings";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/home"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/savings"
                    element={
                        <Layout>
                            <Savings />
                        </Layout>
                    }
                />
                <Route
                    path="/expenses"
                    element={
                        <Layout>
                            <Expenses />
                        </Layout>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <Layout>
                            <Analytics />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;