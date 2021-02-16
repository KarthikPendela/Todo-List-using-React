import React, { useState,useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {

  const [inputText,setInputText]=useState('');
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos,setfilteredTodos]=useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[]);
  
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status])

  const filterHandler = () =>{
    switch(status){
      case "completed":
        setfilteredTodos(todos.filter(todo=> todo.completed ===true));
        break;
      
      case "uncompleted":
        setfilteredTodos(todos.filter(todo=> todo.completed ===false));
        break;

      default:
        setfilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () =>{    
    localStorage.setItem('todos',JSON.stringify(todos));
  }

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos'===null)){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      let localTodos=JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodos);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Karthik's Todo-List</h1>
      </header>

      <Form setInputText={setInputText} inputText={inputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>

    </div>
  );
}

export default App;
