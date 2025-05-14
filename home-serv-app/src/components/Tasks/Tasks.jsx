import React from 'react';

const Tasks = ({
  tasks,
  newTask,
  setNewTask,
  addTask,
  toggleTask,
  deleteTask,
  taskSize,
  startResizingTask,
}) => {
  return (
    <div
      className="absolute top-24 left-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto"
      style={{ width: taskSize.width, height: taskSize.height }}
    >
      <h2 className="text-lg font-bold mb-2 border-b pb-1 border-gray-600">Список дел</h2>
      <div className="flex gap-2 mb-3">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача..."
          className="flex-grow px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTask}
          className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-transform transform hover:scale-105"
        >
          +
        </button>
      </div>
      <ul className="space-y-2 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
        {tasks.map((task, index) => (
          <li key={index} className="p-2 bg-gray-700 rounded flex justify-between items-center group">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="form-checkbox h-5 w-5 text-purple-500"
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
            </label>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-400 opacity-0 group-hover:opacity-105 transition-opacity"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {/* Ресайзер в правом нижнем углу */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500"
        onMouseDown={startResizingTask}
      ></div>
    </div>
  );
};

export default Tasks;