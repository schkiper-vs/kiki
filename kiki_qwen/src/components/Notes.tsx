// src/components/Notes.tsx
import React, { useState, useEffect, useRef } from 'react';
import { saveToDB, loadFromDB } from '../utils/indexedDB';
import type { Position, Size } from '../types';

interface Note {
  id: string;
  text: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 1000, y: 90 });
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [isLoaded, setIsLoaded] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Загружаем из IndexedDB при монтировании
  useEffect(() => {
    const load = async () => {
      const saved = await loadFromDB<{ notes: Note[], position: Position, size: Size }>('notes');
      if (saved) {
        setNotes(saved.notes || []);
        setPosition(saved.position || { x: 400, y: 50 });
        setSize(saved.size || { width: 300, height: 300 });
      }
      setIsLoaded(true);
    };
    load();
  }, []);

  // Сохраняем при изменении notes / position / size
  useEffect(() => {
    if (!isLoaded) return;

    const save = async () => {
      await saveToDB('notes', {
        notes,
        position,
        size,
      });
    };
    save();
  }, [notes, position, size, isLoaded]);

  const handleAddNote = () => {
    if (!inputValue.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: inputValue,
    };
    setNotes([...notes, newNote]);
    setInputValue('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const copyNoteText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Текст скопирован!');
    });
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
      className="absolute top-24 right-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto"
      //className="absolute bg-white/30 backdrop-blur-sm rounded shadow-lg"
      //absolute top-24 right-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto
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
        <h3 className="font-semibold">Заметки</h3>
      </div>

      {/* Список заметок */}
      <div className="p-3 overflow-auto h-full max-h-[calc(100%-40px)]">
        <div className="flex gap-2 mb-3">
          <textarea
            className="flex-1 p-2 border border-gray-300 rounded outline-none resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Добавить заметку"
            rows={2}
          />
          <button
            onClick={handleAddNote}
            className="px-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>

        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="relative group">
              <div
                className="p-2 border-gray-300 rounded bg-white/20 break-words whitespace-pre-wrap"
                style={{ wordBreak: 'break-word' }}
              >
                {note.text}
              </div>
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 flex gap-1">
                <button
                  onClick={() => copyNoteText(note.text)}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                  title="Копировать"
                >
                  📋
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 text-xs"
                  title="Удалить"
                >
                  &times;
                </button>
              </div>
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

export default Notes;