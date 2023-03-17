<template>
  <Navbar></Navbar>
  <div class="container mt-3">
    <!-- Hero Section, visible if user just Logged In-->
    <Transition name="fade">
      <div class="row" v-if="this.justLoggedIn">
        <div class="alert alert-light border text-center alert-dismissible fade show">
          <h1 class="text-dark">Hallo {{ this.userStore.user.username }}, schön dich zu sehen.</h1>
          <button type="button" class="btn-close text-reset" @click="this.justLoggedIn = false" aria-label="Close"></button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { useAuthStore } from "../stores/auth.store";
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: {
    Navbar,
  },
  data() {
    return {
      justLoggedIn: false,
    };
  },
  mounted() {
    this.justLoggedIn = this.$router.options.history.state.back == "/login";
    setTimeout(() => {
      this.justLoggedIn = false;
    }, 10000);
  },
};
</script>

<style scoped></style>
