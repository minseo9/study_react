import "./App.css";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import dayjs from "dayjs";
import Home from "./pages/Home";
import Add from "./pages/Add";

const testTodo = [
    {
        id: `${dayjs().format("YYYY-MM-DD")}-1`,
        isChecked: false,
        date: dayjs(),
        content: "test1",
        memo: "memo1",
    },
    {
        id: `${dayjs().format("YYYY-MM-DD")}-2`,
        isChecked: false,
        date: dayjs(),
        content: "test2",
        memo: "memo",
    },
];

export const DateContext = createContext();
export const SelectedDatContext = createContext();
export const TodoContext = createContext();

function App() {
    const [date, setDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(date);
    const [todo, setTodo] = useState([...testTodo]);

    return (
        <DateContext.Provider value={{ date, setDate }}>
            <SelectedDatContext.Provider
                value={{ selectedDate, setSelectedDate }}
            >
                <TodoContext.Provider value={{ todo, setTodo }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<Add />} />
                    </Routes>
                </TodoContext.Provider>
            </SelectedDatContext.Provider>
        </DateContext.Provider>
    );
}

export default App;
