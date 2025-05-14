import { useState } from 'react';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return {
    notes,
    newNote,
    setNewNote,
    addNote,
    deleteNote,
  };
};