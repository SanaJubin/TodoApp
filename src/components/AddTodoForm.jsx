// src/components/AddTodoForm.js
import React, { useEffect, useState } from "react";

const AddTodoForm = ({ onAdd, onCancel ,onEdit ,editingTodo}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);




  useEffect(()=>{
    if (editingTodo){
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setDueDate(editingTodo.due_date);
    }else{
      setTitle("");
      setDescription("");
      setDueDate(new Date().toISOString().split("T")[0]);
    }
  },[editingTodo]);






  const handleSubmit = async (e) => {
  e.preventDefault();

  const newTodo = {
    title,
    description,
    due_date: dueDate,
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/api/cards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
      throw new Error("Failed to add todo");
    }

    const data = await res.json();
    onAdd(data);

  } catch (error) {
    console.error("Error adding todo:", error);
  }
};


  return (
    <div className="card" id="add-sticky-form">
      <form onSubmit={handleSubmit}>
        <h2>{editingTodo ? "Edit Sticky": "Add New Sticky"}</h2>
        <label>Title:</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />

        <label>Description:</label><br />
        <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />

        <label>Due Date:</label><br />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br /><br />

        <button type="submit">{editingTodo ? "Edit Sticky": "Add New Sticky"}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
