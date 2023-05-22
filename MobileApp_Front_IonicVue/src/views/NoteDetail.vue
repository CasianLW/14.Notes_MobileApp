<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="floating">Edit Note</ion-label>
        <ion-textarea v-model="note.content"></ion-textarea>
        <ion-button @click="updateNote">Update Note</ion-button>
      </ion-item>
      <ion-button @click="goBack">Back to Notes</ion-button>
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
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotesStore } from "@/stores/notes";

const notesStore = useNotesStore();
const router = useRouter();
const route = useRoute();
const note = ref({ id: route.params.id, content: "" });

onMounted(async () => {
  const noteDetails = notesStore.notes.find(
    (note) => note.id === route.params.id
  );
  if (noteDetails) {
    note.value.content = noteDetails.content;
  } else {
    await notesStore.fetchNotes();
    const fetchedNote = notesStore.notes.find(
      (note) => note.id === route.params.id
    );
    if (fetchedNote) {
      note.value.content = fetchedNote.content;
    }
  }
});

const updateNote = async () => {
  await notesStore.updateNote(note.value.id, note.value);
  router.push("/notes");
};

const goBack = () => {
  router.push("/notes");
};
</script>
