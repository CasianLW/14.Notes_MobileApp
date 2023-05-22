import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = "https://api-app-notes-ajvs.onrender.com";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
  }),
  actions: {
    async fetchNotes() {
      try {
        const response = await axios.get(`${apiUrl}/api/notes`);
        this.notes = response.data;
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    },
    async createNote(newNote) {
      try {
        const response = await axios.post(`${apiUrl}/api/notes`, newNote);
        const createdNote = response.data;
        this.notes.push(createdNote);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    },
    async deleteNote(id) {
      try {
        await axios.delete(`${apiUrl}/api/notes/${id}`);
        this.notes = this.notes.filter((note) => note.id !== id);
      } catch (error) {
        console.error(`Error deleting note with id ${id}:`, error);
      }
    },
    async updateNote(id, updatedNote) {
      try {
        await axios.put(`${apiUrl}/api/notes/${id}`, updatedNote);
        const index = this.notes.findIndex((note) => note.id === id);
        if (index !== -1) {
          this.notes[index] = { ...this.notes[index], ...updatedNote };
        }
      } catch (error) {
        console.error(`Error updating note with id ${id}:`, error);
      }
    },
  },
});
