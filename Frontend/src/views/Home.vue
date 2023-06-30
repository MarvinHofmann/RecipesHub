<template>
  <Navbar></Navbar>
  <div class="container">
    <!-- Hero Section, visible if user just Logged In-->
    <Transition name="fade">
      <div class="row mx-0 mt-3" v-if="this.justLoggedIn">
        <div class="alert alert-light border text-center alert-dismissible fade show">
          <h1 class="text-dark">Hallo {{ this.userStore.user.username }}, schön dich zu sehen.</h1>
          <button type="button" class="btn-close text-reset" @click="this.justLoggedIn = false" aria-label="Close"></button>
        </div>
      </div>
    </Transition>

    <div class="row">
      <div class="col-md-6 mt-3">
        <ShoppingList></ShoppingList>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card card-body h-100" type="button" @click="this.$router.push('/wochenPlan')">
          <h5>Dein Plan für den {{ new Date().toLocaleDateString() }}:</h5>
          <ul>
            <li v-for="elem in this.today">
              {{ elem.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div>
      <h3 class="mt-4">Wie wäre es mit?</h3>
      <hr class="mt-0 mb-0" />
    </div>

    <div class="row mt-4" v-if="this.randomRecipes && !this.loading">
      <RecipeCard v-for="item in randomRecipes" :recipe-name="item.title" :category="item.category" :tags="item.tags" :duration="item.cookingTime" :recipeID="item._id" :image="item.imgSrc"></RecipeCard>
    </div>
    <div class="row mt-3" v-else>
      <SceletonCard v-for="item in 4" />
    </div>

    <div class="float-end mt-0">
      <button class="btn btn-outline-dark" @click="this.$router.push('/browse')">Alle Browse</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { useAuthStore } from "../stores/auth.store";
import RecipeCard from "../components/RecipeCard.vue";
import { getRandomRecipes } from "../api/recipeHandling";
import SceletonCard from "../components/SceletonCard.vue";
import ShoppingList from "../components/ShoppingList.vue";
import { getTodaysPlan } from "../api/weekPlanHandling"
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: {
    Navbar,
    RecipeCard,
    SceletonCard,
    ShoppingList
  },
  data() {
    return {
      justLoggedIn: false,
      randomRecipes: [],
      loading: false,
      checked: false,
      today: []
    };
  },
  methods: {
  },
  async mounted() {
    this.loading = true;
    this.justLoggedIn = this.$router.options.history.state.back == "/login";
    let res = await getRandomRecipes();
    if (res.error) {
      // Show error
      return;
    }
    this.randomRecipes = res.data;
    this.today = await getTodaysPlan()
    setTimeout(() => {
      this.justLoggedIn = false;
    }, 5000);
    this.loading = false;
  },
};
</script>

<style scoped></style>
