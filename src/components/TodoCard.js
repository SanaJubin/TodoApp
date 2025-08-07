import React from "react";

const TodoCard = ({ title, description, dueDate, isCompleted, onDelete, onComplete, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-4 border-l-4 border-[#ff9f1c]">
      <h2 className="text-xl font-semibold text-[#264653] mb-2">{title}</h2>
      <ul className="text-sm text-[#555] space-y-1 mb-3">
        {description && <li>{description}</li>}
        <li><strong>Due:</strong> {dueDate}</li>
        <li>
          <strong>Status:</strong>{" "}
          <span className={isCompleted ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {isCompleted ? "Completed" : "Not Completed"}
          </span>
        </li>
      </ul>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onDelete}
          className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
        >
          Delete
        </button>

        {!isCompleted && (
          <>
            <button
              onClick={onComplete}
              className="bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 text-sm"
            >
              Complete
            </button>

            <button
              onClick={onEdit}
              className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 text-sm"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
