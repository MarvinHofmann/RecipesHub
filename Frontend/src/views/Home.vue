<template>
  <Navbar></Navbar>
  <div class="container mt-3">
    <!-- Hero Section, visible if user just Logged In-->
    <Transition name="fade">
      <div class="row mx-0" v-if="this.justLoggedIn">
        <div class="alert alert-light border text-center alert-dismissible fade show">
          <h1 class="text-dark">Hallo {{ this.userStore.user.username }}, schön dich zu sehen.</h1>
          <button type="button" class="btn-close text-reset" @click="this.justLoggedIn = false" aria-label="Close"></button>
        </div>
      </div>
    </Transition>

    <div class="row">
      <div class="col-6">
        <div class="card card-body">
          <h5>Einkaufsliste</h5>
        </div>
      </div>
      <div class="col-6">
        <div class="card card-body">
          <h5>Wochenplan</h5>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div>
      <h3 class="mt-4">Wie wäre es mit?</h3>
      <hr class="mt-0 mb-0" />
    </div>

    <div class="row">
      <RecipeCard :category="'Kategorie 1'" :recipeName="'Rezept 1'" :duration="30" :tags="['tags1', 'tags2']"></RecipeCard>
      <RecipeCard :image="'http://via.placeholder.com/640x560'"></RecipeCard>
      <RecipeCard></RecipeCard>
      <RecipeCard></RecipeCard>
    </div>

    <div class="float-end mt-3">
      <button class="btn btn-outline-dark" @click="this.$router.push('/browse')">Alle Browse</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { useAuthStore } from "../stores/auth.store";
import RecipeCard from "../components/RecipeCard.vue";
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: {
    Navbar,
    RecipeCard,
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
    }, 7500);
  },
};
</script>

<style scoped>
.card-body {
  height: 150px;
}
</style>
