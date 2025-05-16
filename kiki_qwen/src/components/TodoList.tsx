// src/components/TodoList.tsx
import React, { useState, useEffect, useRef } from 'react';
import { saveToDB, loadFromDB } from '../utils/indexedDB';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 300, height: 300 });
  const dragRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Загружаем из IndexedDB при монтировании
  useEffect(() => {
    const load = async () => {
      const saved = await loadFromDB('todoList');
      if (saved) {
        setTodos(saved.todos);
        setPosition(saved.position || { x: 50, y: 50 });
        setSize(saved.size || { width: 300, height: 300 });
      }
    };
    load();
  }, []);

  // Сохраняем при изменении todos / position / size
  useEffect(() => {
    const save = async () => {
      await saveToDB('todoList', {
        todos,
        position,
        size,
      });
    };
    save();
  }, [todos, position, size]);

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Drag handler
  const startDragging = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = position.x;
    const initialY = position.y;

    const onMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setPosition({
        x: initialX + dx,
        y: initialY + dy,
      });
    };

    const stopDragging = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', stopDragging);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDragging);
  };

  // Resize handler
  const startResizing = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = size.width;
    const initialHeight = size.height;

    const onMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setSize({
        width: Math.max(200, initialWidth + dx),
        height: Math.max(100, initialHeight + dy),
      });
    };

    const stopResizing = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', stopResizing);
    };

    document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', stopResizing);
  };

  return (
    <div
      className="absolute bg-white/50 backdrop-blur-sm border border-gray-300 rounded shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Заголовок */}
      <div
        ref={dragRef}
        className="bg-black/20 px-4 py-2 cursor-move rounded-t flex justify-between items-center"
        onMouseDown={startDragging}
      >
        <h3 className="font-semibold">Список дел</h3>
      </div>

      {/* Список */}
      <div className="p-3 overflow-auto h-full">
        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 p-2 border border-gray-300 rounded outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Добавить задачу"
          />
          <button
            onClick={handleAddTodo}
            className="px-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="cursor-pointer"
              />
              <span
                className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Ресайзер */}
      <div
        ref={resizeRef}
        onMouseDown={startResizing}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-500 rounded"
      ></div>
    </div>
  );
};

export default TodoList;