import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
function App() {
    const todoNameRef = useRef();
    const [todos, setTodos] = useState([])
    const Local_storage_key = 'todoApp.todos'

    useEffect( ()=> {
        const storedTodos = JSON.parse(localStorage.getItem((Local_storage_key)))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect( ()=> {
        localStorage.setItem(Local_storage_key, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.any(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleTodo(e){
        const name = todoNameRef.current.value;
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id : uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null;


    }

    function handleClearTodo(){
        const newTodos =  todos.filter(todo => !todo.complete)
        setTodos(newTodos);
    }


  return (
      <>
        <TodoList todos ={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text"/>
          <button onClick={handleTodo}>Add Todos</button>
          <button onClick={handleClearTodo}>Clear complete</button>
          <div>{todos.filter(todo=> !todo.complete).length}</div>
      </>

  );
}

export default App;
