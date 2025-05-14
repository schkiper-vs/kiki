import React, { useRef } from 'react';
//import './Notes.css'; // если нужно добавить стили

const Notes = ({ notes, newNote, setNewNote, addNote, deleteNote, noteSize, startResizingNote }) => {
  return (
    <div
      className="absolute top-24 right-4 z-20 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 overflow-auto"
      style={{ width: noteSize.width, height: noteSize.height }}
    >
      <h2 className="text-lg font-bold mb-2 border-b pb-1 border-gray-600">Заметки</h2>
      {/* Форма добавления новой заметки */}
      <div className="mb-3">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Новая заметка..."
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none overflow-hidden"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        <button
          onClick={addNote}
          className="mt-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-transform transform hover:scale-105"
        >
          +
        </button>
      </div>

      {/* Список заметок */}
      <ul className="space-y-2 max-h-[calc(100%-100px)] overflow-y-auto custom-scrollbar">
        {notes.map((note, index) => (
          <li key={index} className="p-2 bg-gray-700 rounded break-words group">
            <pre className="whitespace-pre-wrap font-normal">{note}</pre>
            <button
              onClick={() => deleteNote(index)}
              className="text-red-400 opacity-0 group-hover:opacity-105 transition-opacity float-right mt-1"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {/* Ресайзер в левом нижнем углу */}
      <div
        className="absolute bottom-0 left-0 w-4 h-4 cursor-nwse-resize bg-transparent hover:bg-blue-500"
        onMouseDown={startResizingNote}
      ></div>
    </div>
  );
};

export default Notes;