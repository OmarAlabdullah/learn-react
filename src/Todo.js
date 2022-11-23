import React from "react";

export default function Todo({todo, toggletodo}){

    function handleTodoClick(){
        toggletodo(todo.id)
    }

    return(
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}