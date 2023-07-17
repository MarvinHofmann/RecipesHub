<template>
  <Navbar></Navbar>

  <div class="container">
    <div class="row">
      <div class="col-6 mt-3">
        <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addRecipeModal" type="button">Rezept erstellen</button>
      </div>
      <div class="col-6 mt-3">
        <div class="float-end">
          <p class="d-none d-xs-none d-sm-inline-block me-2 p-0 m-0">{{ this.numberOfRecipes }} Rezepte</p>
          <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#filterCollapse" aria-expanded="false" aria-controls="filterCollapse">
            Filter Anzeigen
          </button>
        </div>
      </div>
    </div>

    <!-- Collapse Region of the Filter-->
    <div class="row">
      <div class="collapse mt-2" id="filterCollapse">
        <div class="card card-body">
          <div class="row">
            <div class="col-lg-6">
              <h6 class="mb-1">Tags</h6>
              <form class="mt-1">
                <div class="form-check form-check-inline mb-2" v-for="(tag, index) in loadedTags" @change="this.filterList()">
                  <input class="form-check-input" type="checkbox" :value="tag" v-model="this.filter.tags" :id="tag + index" />
                  <label class="form-check-label" :for="tag + index"> {{ tag }} </label>
                </div>
              </form>
            </div>
            <div class="col-lg-6 border-left">
              <h6 class="mb-1">Kategorie</h6>
              <form class="mt-1">
                <div class="form-check form-check-inline mb-2" v-for="(category, index) in loadedCategories" @change="this.filterList()">
                  <input class="form-check-input" type="checkbox" :value="category" v-model="this.filter.categories" :id="category + index" />
                  <label class="form-check-label" :for="category + index"> {{ category }} </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-12 mt-3" v-if="this.numberOfRecipes == 0">
      <div class="card text-center">
        <div class="card-body">
          <h2>Noch keine Rezepte erstellt, jetzt neues Rezept erstellen</h2>
          <button class="btn btn-outline-dark mt-2" data-bs-toggle="modal" data-bs-target="#addRecipeModal" type="button">Rezept erstellen</button>
        </div>
      </div>
    </div>

    <!-- Recipes Card dynamically created -->
    <div class="row mt-3">
      <RecipeCard v-for="item in filteredList" :recipe-name="item.title" :category="item.category" :tags="item.tags" :duration="item.cookingTime" :recipeID="item._id" :image="item.imgSrc"></RecipeCard>
    </div>
  </div>
  <AddRecipe id="addRecipeModal"></AddRecipe>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RecipeCard from "../components/RecipeCard.vue";
import AddRecipe from "../components/Modals/AddRecipe.vue";
import { getAllRecipes } from "../api/recipeHandling";
import { getTags, getCategories } from "../api/userdataHandling";
export default {
  components: {
    Navbar,
    RecipeCard,
    AddRecipe,
  },
  data() {
    return {
      numberOfRecipes: 0,
      filter: {
        tags: [],
        categories: [],
      },
      loadedTags: [],
      loadedCategories: [],
      recipesList: [],
      filteredList: [],
    };
  },
  methods: {
    // Filtering the recipesList and putting the filtered results into filteredList.
    filterList() {
      this.filteredList = [];
      if (this.filter.tags.length == 0 && this.filter.categories.length == 0) {
        this.filteredList = this.recipesList;
        return;
      }
      for (let i = 0; i < this.recipesList.length; i++) {
        const element = this.recipesList[i];
        // Filter for tags
        for (let j = 0; j < this.filter.tags.length; j++) {
          if (element.tags.length > 0 && element.tags.includes(this.filter.tags[j])) {
            // Only push if not already included through other tag
            if (!this.filteredList.includes(element)) {
              this.filteredList.push(element);
            }
          }
        }
        // Filter for category
        for (let k = 0; k < this.filter.categories.length; k++) {
          if (element.category == this.filter.categories[k] && !this.filteredList.includes(element)) {
            // Only push if not already included through other tag
            if (!this.filteredList.includes(element)) {
              this.filteredList.push(element);
            }
          }
        }
      }
    },
  },
  async mounted() {
    let res = await getAllRecipes();
    if (res.error) {
      // Show error
      return;
    }
    this.recipesList = res.data;
    this.filteredList = res.data;
    this.numberOfRecipes = res.data.length;

    this.loadedTags = await getTags();
    this.loadedCategories = await getCategories();
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
