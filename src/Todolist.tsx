import React from "react";

type TitlePropsType = {
    mainTitle: string
    content: Array<ContentPropsType>
};

type ContentPropsType = {
    id: number
    title: string
    isDone: boolean
};

export function Todolist(props: TitlePropsType) {
    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.content[0].isDone}/><span>{props.content[0].title}</span></li>
                <li><input type="checkbox" checked={props.content[1].isDone}/><span>{props.content[1].title}</span></li>
                <li><input type="checkbox" checked={props.content[2].isDone}/><span>{props.content[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}