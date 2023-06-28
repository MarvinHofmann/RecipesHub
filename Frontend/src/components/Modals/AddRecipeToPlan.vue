<template>
  <!-- Modal -->
  <div class="modal fade" id="addToDate" tabindex="-1" aria-labelledby="addToDateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addToDateModalLabel">
           <b v-if="this.selectedRecipe != null">{{ this.selectedRecipe.title }}</b> <text v-else>Neues Rezept</text> am <b>{{ this.date }}</b>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Welches Rezept wollen Sie hinzufügen?</p>

          <div v-for="recipe in recipes">
            <input v-model="this.selectedRecipe" :value="recipe" type="radio"  name="options-outlined" :id="recipe._id" class="btn-check">
            <label class="btn btn-outline-dark  w-100 mt-1" :for="recipe._id">{{ recipe.title }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal"
            @click="this.onAddRecipeToDate()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllRecipes, addRecipeToPlan } from "../../api/recipeHandling";
export default {
  props: ["date"],
  data() {
    return {
      recipes: [],
      selectedRecipe: null
    };
  },
  methods: {
    async onAddRecipeToDate(){
      let res = await addRecipeToPlan(this.selectedRecipe, this.date);
    }
  },
  async mounted() {
    let res = await getAllRecipes();
    if (res.error) {
      // Show error
      return;
    }
    this.recipes = res.data;
  },
};
</script>

<style scoped></style>
