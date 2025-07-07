import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default App;
