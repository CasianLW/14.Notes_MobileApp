<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="floating">New Note</ion-label>
        <ion-textarea v-model="newNote.content"></ion-textarea>
        <ion-button @click="createNote">Add Note</ion-button>
      </ion-item>
      <ion-list>
        <ion-item v-for="note in notes" :key="note.id">
          <p>{{ note.content }}</p>
          <ion-button @click="deleteNote(note.id)">Delete</ion-button>
          <ion-button @click="updateNote(note.id, note)">Edit</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonLabel,
  IonTextarea,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useNotesStore } from "@/stores/notes";

const notesStore = useNotesStore();
const notes = ref([]);
const newNote = ref({ content: "" });

onMounted(async () => {
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
});

const createNote = async () => {
  if (newNote.value.content !== "") {
    await notesStore.createNote(newNote.value);
    newNote.value = { content: "" };
    // re-fetch notes to include the new one
    await notesStore.fetchNotes();
    notes.value = notesStore.notes;
  }
};

const deleteNote = async (id) => {
  await notesStore.deleteNote(id);
  // re-fetch notes to exclude the deleted one
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
};

const updateNote = async (id, updatedNote) => {
  await notesStore.updateNote(id, updatedNote);
  // re-fetch notes to include the updated note
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
};
</script>

<!-- <style scoped>

</style> -->
