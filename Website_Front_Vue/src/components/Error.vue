<template>
    <div v-if="error">
        <div v-for="e in errors" class="error">
          {{ e.$property }}: {{ e.$message }}
        </div>
        <br>
      </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>

<script>
export default {
    name: "Error",
    props: ["error", "errors"]
}
</script>
