// src/App.js
import React, { useEffect, useState } from "react";
import Sidebar from "./../components/Sidebar";
import TodoCard from "./../components/TodoCard";
import AddTodoForm from "./../components/AddTodoForm";
import CompletedTodos from "./../components/CompletedTodos";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);
  useEffect(() => {
      fetch("http://127.0.0.1:8000/api/cards/")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.filter(todo => !todo.is_completed));
        setCompletedTodos(data.filter(todo => todo.is_completed));
      });
  }, []);


  const handleDelete= async (id)=>{
    const res = await  fetch (`http://127.0.0.1:8000/api/cards/${id}/`,{
      method:"DELETE",
    });

    if(res.ok){
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // const handleComplete = async (id) => {
  //   const todoToUpdate = todos.find(todo => todo.id === id);
  //   const updatedTodo = {...todoToUpdate,is_completed : true};

  //   const res = await fetch(`http://127.0.0.1.8000/apo/cards/${id}/`,{
  //     method :"PUT",
  //     headers :{
  //       "content-Type": "application/json",
  //     },
  //     body:JSON.stringify(updatedTodo),
  //   });

  //   if(res.ok){
  //     setTodos(todos.filter(todo => todo.id !== id));
  //     setCompletedTodos([...completedTodos,updatedTodo]);
  //   }
  // }; 

const handleComplete = async (id) => {
  const todoToUpdate = todos.find(todo => todo.id === id);

  if (!todoToUpdate) {
    console.error("Todo not found for id:", id);
    return;
  }

  const updatedTodo = { ...todoToUpdate, is_completed: true };

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/cards/${id}/`, {
      method : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!res.ok) throw new Error("Failed to complete todo");

    const data = await res.json();
    setTodos((prevTodos) => prevTodos.filter((todo)=> todo.id !== id));
    setCompletedTodos((prevCompleted) => [...prevCompleted,data]);
      
  } catch (err) {
    console.error("Error completing todo:", err); 
  }
};


const handleDeleteCompleted = async (id) =>  {
  const res = await fetch(`http://127.0.01:8000/api/cards/${id}/`,{
    method:"DELETE",
  });

  if (res.ok){
    setCompletedTodos((prev) => prev.filter((todos) => todos.id !== id));
  }
}


const handleEdit = (todo) => {
  setEditingTodo(todo);
  setShowForm(true);
};

const handleSaveEdit = async (updatedTodo) => {
  const res = await fetch (`http://127.0.0.1.8000/api/cards/${updatedTodo.id}/`,{
    method:"PUT",
    headers:{"content-type":"apllication/json"},
    body:JSON.stringify(updatedTodo),
  });
  if(res.ok){
    const data = await res.json();
    setTodos((prev) => 
    prev.map((todo) => (todo.id === data.id ? data: todo))
  );
  setEditingTodo(null);
  setShowForm(false);
  }
};

  return (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6 border-b pb-2">
        <h1 className="text-3xl font-bold text-blue-700">Sticky Wall</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            dueDate={todo.due_date}
            isCompleted={todo.is_completed}
            onDelete={() => handleDelete(todo.id)}
            onComplete={() => handleComplete(todo.id)}
            onEdit={() => handleEdit(todo)}
          />
        ))}

        {/* {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTodo(null);
            }}
            className="h-40 border-2 border-dashed border-blue-400 text-blue-500 hover:bg-blue-50 font-semibold rounded-xl transition"
          >
            + Add Sticky
          </button>
        )} */}

        {showForm && (
          <AddTodoForm
            onCancel={() => setShowForm(false)}
            onAdd={(newTodo) => {
              setTodos([...todos, newTodo]);
              setShowForm(false);
            }}
            onEdit={handleSaveEdit}
            setEditingTodo={editingTodo}
          />
        )}
      </div>

      <div className="mb-4 border-b pb-2">
        <h1 className="text-2xl font-semibold text-green-700">Completed Tasks</h1>
      </div>

      <CompletedTodos todos={completedTodos} onDelete={handleDeleteCompleted} />
    </main>
  </div>
);

}
export default Todo;

