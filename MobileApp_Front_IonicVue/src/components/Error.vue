<template>
  <div v-if="error">
    <div v-for="e in errors" class="error" :key="e.$property">
      {{ e.$property }}: {{ e.$message }}
    </div>
    <br />
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

interface ErrorObject {
  $property: string;
  $message: string;
}

export default defineComponent({
  name: "Error",
  props: {
    error: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Array as () => ErrorObject[],
      required: true,
    },
  },
});
</script>
