import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let task1 = [
        {
            id: 1,
            title: "CSS&HTML",
            isDone: true
        },
        {
            id: 2,
            title: "JS",
            isDone: true
        },
        {
            id: 3,
            title: "React",
            isDone: false
        },
    ];

    let task2 = [
        {
            id: 1,
            title: "Terminator",
            isDone: true
        },
        {
            id: 2,
            title: "XXX",
            isDone: false
        },
        {
            id: 3,
            title: "Gentlemen",
            isDone: true
        },
    ];

    return (
        <div className="App">
            <Todolist mainTitle={"What to learn"} content={task1}/>
            <Todolist mainTitle={"Movies"} content={task2}/>
        </div>
    );
}

export default App;
