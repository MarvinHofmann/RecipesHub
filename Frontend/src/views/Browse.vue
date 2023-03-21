<template>
  <Navbar></Navbar>

  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-6 mt-2">
        <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addRecipeModal" type="button">Rezept erstellen</button>
      </div>
      <div class="col-sm-6 mt-2">
        <div class="float-sm-end">
          <p class="d-sm-inline-block me-2 p-0 m-0">{{ this.numberOfRecipes }} Rezepte</p>
          <button
            class="btn btn-outline-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filterCollapse"
            aria-expanded="false"
            aria-controls="filterCollapse"
          >
            Filter Anzeigen
          </button>
        </div>
      </div>
    </div>

    <!-- Collapse Region of the Filter-->
    <div class="row mt-2">
      <div class="collapse" id="filterCollapse">
        <div class="card card-body">
          <div class="row">
            <div class="col-lg-6">
              <h6 class="mb-1">Tags</h6>
              <form class="mt-1">
                <div class="form-check form-check-inline mb-2" v-for="tag in userStore.user.tags">
                  <input class="form-check-input" type="checkbox" :value="tag" v-model="this.filter.tags" :id="tag" />
                  <label class="form-check-label" :for="tag"> {{ tag }} </label>
                </div>
              </form>
            </div>
            <div class="col-lg-6 border-left">
              <h6 class="mb-1">Kategorie</h6>
              <form class="mt-1">
                <div class="form-check form-check-inline mb-2" v-for="category in userStore.user.categories">
                  <input class="form-check-input" type="checkbox" :value="category.name" v-model="this.filter.categories" :id="category" />
                  <label class="form-check-label" :for="category"> {{ category.name }} </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Collapse Region of the Filter-->
    <div class="row">
      <RecipeCard
        v-for="item in recipesList"
        :recipe-name="item.title"
        :category="item.category"
        :tags="item.tags"
        :duration="item.processingTime"
        :recipeID="item._id"
      ></RecipeCard>
    </div>
  </div>
  <AddRecipe id="addRecipeModal"></AddRecipe>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import AddRecipe from "../components/Modals/AddRecipe.vue";
import { useAuthStore } from "../stores/auth.store";
import { getAllRecipes } from "../api/recipeHandling";
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: {
    Navbar,
    RecipeCard,
    AddRecipe,
  },
  data() {
    return {
      numberOfRecipes: 5,
      filter: {
        tags: [],
        categories: [],
      },
      recipesList: [],
    };
  },
  async mounted() {
    let res = await getAllRecipes();
    if (res.error) {
      // Show error
      return;
    }
    this.recipesList = res.data;
  },
};
</script>

<style scoped>
/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .border-left {
    padding-left: 30px;
    border-left: 1px solid var(--bs-border-color-translucent);
  }
}
</style>
