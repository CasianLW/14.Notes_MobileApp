<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="floating">New Note...</ion-label>
        <ion-textarea
          placeholder="My text..."
          v-model="newNote.content"
        ></ion-textarea>
        <ion-button @click="createNote">Add Note</ion-button>
      </ion-item>
      <ion-list>
        <ion-item v-for="note in notes" :key="note.id">
          <ion-label>{{ note.content }}</ion-label>

          <div class="ion-button-container">
            <ion-button @click="navigateToEdit(note.id)" class="edit-button">
              Edit
            </ion-button>
            <ion-button
              fill="outline"
              color="danger"
              @click="deleteNote(note.id)"
              class="delete-button"
            >
              Delete
            </ion-button>
          </div>
        </ion-item>
      </ion-list>
      <div class="ion-text-center" v-if="activeSpinner">
        <br />
        <br />
        <ion-spinner color="primary"></ion-spinner>
      </div>
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
  IonSpinner,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useNotesStore } from "@/stores/notes";
import { useRouter } from "vue-router";

const activeSpinner = ref(false);

const notesStore = useNotesStore();
const notes = ref([]);
const newNote = ref({ content: "" });
const router = useRouter();

onMounted(async () => {
  activeSpinner.value = true;
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
  activeSpinner.value = false;
});

const createNote = async () => {
  if (newNote.value.content !== "") {
    activeSpinner.value = true;

    await notesStore.createNote(newNote.value);
    newNote.value = { content: "" };
    // re-fetch notes to include the new one at beginning
    activeSpinner.value = false;
    await notesStore.fetchNotes();
    notes.value = notesStore.notes;
  }
};

const deleteNote = async (id) => {
  activeSpinner.value = true;

  await notesStore.deleteNote(id);

  // re-fetch notes to exclude the deleted one
  await notesStore.fetchNotes();
  activeSpinner.value = false;

  notes.value = notesStore.notes;
};
const navigateToEdit = (id) => {
  router.push({ path: `/notes/${id}` });
};

const updateNote = async (id, updatedNote) => {
  await notesStore.updateNote(id, updatedNote);
  // re-fetch notes to include the updated note
  await notesStore.fetchNotes();
  notes.value = notesStore.notes;
};
</script>

<style scoped>
.ion-button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.edit-button {
  margin-right: 8px;
}

.delete-button {
  margin-left: 8px;
}
</style>
