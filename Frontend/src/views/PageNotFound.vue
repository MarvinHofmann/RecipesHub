<template>
  <div class="container">
    <div class="center-container">
      <h1 class="text-center">404</h1>
      <p class="fs-1 text-center">Ooops! Wir konnten die angefragte Seite nicht finden.</p>
      <p class="text-muted text-center">Versuche zu deiner persönlichen Übersicht zurückzukehren.</p>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-dark" @click="this.$router.push('/home')">Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.center-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
