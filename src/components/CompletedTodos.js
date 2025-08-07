import React from "react";

const CompletedTodos = ({ todos, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {todos.map((todo) => (
        <div
          className="bg-gray-100 rounded-xl shadow p-4 border-l-4 border-green-500"
          key={todo.id}
        >
          <h2 className="text-lg font-semibold text-green-700 mb-2">{todo.title}</h2>
          <ul className="text-sm text-gray-700 space-y-1 mb-3">
            {todo.description && <li>{todo.description}</li>}
            <li><strong>Due:</strong> {todo.due_date}</li>
            <li>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-medium">
                {todo.is_completed ? "Completed" : "Not Completed"}
              </span>
            </li>
          </ul>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodos;
