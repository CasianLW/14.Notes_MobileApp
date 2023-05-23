<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/notes"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Note</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card class="edit-note-card">
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Edit Note</ion-label>
            <ion-textarea
              v-model="note.content"
              :placeholder="note.content"
            ></ion-textarea>
          </ion-item>
          <ion-button expand="full" @click="updateNote">Update Note</ion-button>
          <ion-button
            fill="outline"
            color="danger"
            expand="full"
            @click="deleteNote"
            >Delete Note</ion-button
          >
        </ion-card-content>
      </ion-card>
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
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonSpinner,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNotesStore } from "@/stores/notes";

const notesStore = useNotesStore();
const router = useRouter();
const route = useRoute();
const note = ref({ id: route.params.id, content: "" });
const activeSpinner = ref(false);

onMounted(async () => {
  activeSpinner.value = true;

  const fetchedNote = await notesStore.fetchNoteById(route.params.id);
  if (fetchedNote) {
    note.value.content = fetchedNote.content;
  }
  activeSpinner.value = false;
});

const updateNote = async () => {
  activeSpinner.value = true;

  await notesStore.updateNote(note.value.id, note.value);
  activeSpinner.value = false;

  // router.push("/notes");
};

const deleteNote = async () => {
  activeSpinner.value = true;

  await notesStore.deleteNote(note.value.id);
  await notesStore.fetchNotes();
  activeSpinner.value = false;

  router.push("/notes");
};

const goBack = () => {
  router.push("/notes");
};
</script>

<style scoped>
.edit-note-card {
  margin-bottom: 20px;
}
</style>
