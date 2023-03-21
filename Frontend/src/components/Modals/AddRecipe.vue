<template>
  <!-- Modal -->
  <div class="modal modal-xl fade" id="addRecipeModal" tabindex="-1" aria-labelledby="addRecipeModalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addRecipeModalLabel">Rezept Erstellen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="recipeData">
            <div class="container px-5 mt-2">
              <h5>Informationen</h5>
              <!-- Row Name / Quelle -->
              <div class="row mt-2">
                <div class="col-lg-6">
                  <label for="title" class="form-label">Titel</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="text"
                      v-model="this.recipeData.title"
                      id="title"
                      :class="{ 'is-invalid': v$.recipeData.title.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.recipeData.title.$error">Titel des Rezepts Benötigt</div>
                </div>

                <div class="col-lg-6">
                  <label for="source" class="form-label">Quelle</label>
                  <div class="input-group">
                    <input v-model="this.recipeData.source" type="text" class="form-control" id="source" />
                  </div>
                </div>
              </div>

              <!-- Row Zeit / Bilder -->
              <div class="row mt-3">
                <div class="col-lg-6">
                  <label for="time" class="form-label">Benötigte Zeit</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="number"
                      v-model="this.recipeData.processingTime"
                      id="time"
                      :class="{ 'is-invalid': v$.recipeData.processingTime.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.recipeData.processingTime.$error">Die ungefähre Dauer der Zubereitung in Minuten</div>
                </div>

                <div class="col-lg-6">
                  <label for="images" class="form-label">Bilder</label>
                  <div class="input-group">
                    <input type="file" class="form-control" id="images" />
                  </div>
                </div>
              </div>

              <!-- Row Zeit / Bilder -->
              <div class="row mt-3">
                <div class="col-lg-6">
                  <label for="description" class="form-label">Beschreibung</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="text"
                      v-model="this.recipeData.description"
                      id="description"
                      :class="{ 'is-invalid': v$.recipeData.description.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.recipeData.description.$error">Eine kurze Beschreibung deines Gerichts</div>
                </div>

                <div class="col-lg-6">
                  <label for="category" class="form-label">Kategorie</label>
                  <div class="input-group">
                    <select
                      :class="{ 'is-invalid': v$.recipeData.category.$error }"
                      class="form-select"
                      id="category"
                      v-model="this.recipeData.category"
                    >
                      <option v-for="option in this.userStore.user.categories">
                        {{ option.name }}
                      </option>
                    </select>
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.recipeData.category.$error">Kategorie Benötigt</div>
                </div>
              </div>

              <h5 class="mt-3">Zutaten</h5>
              <div class="mt-2">
                <!-- error message -->
                <div class="text-danger" v-if="v$.recipeData.ingredients.$error">Bitte überprüfe die Zutaten auf vollständigkeit</div>
                <div v-for="(ingredient, index) in this.recipeData.ingredients" :key="index">
                  <div class="row">
                    <div class="col-lg-5 mt-2 pe-lg-1">
                      <input v-model="ingredient.name" placeholder="Name der Zutat" class="form-control" type="text" />
                    </div>
                    <div class="col-lg-3 mt-2 ingredientCol">
                      <input v-model="ingredient.amount" placeholder="Menge" class="form-control" type="number" />
                    </div>
                    <div class="col-lg-3 mt-2 ingredientCol">
                      <select class="form-select" id="unitSelect" v-model="ingredient.unit">
                        <option>Gramm</option>
                        <option>Milliliter</option>
                        <option>Esslöffel</option>
                        <option>Teelöffel</option>
                        <option>Tasse</option>
                        <option>Glas</option>
                        <option>Bund</option>
                        <option>Packung</option>
                      </select>
                    </div>
                    <div class="col-lg-1 mt-2 ps-lg-1">
                      <button type="button" class="btn btn-danger" @click="removeIngredient(index)"><i class="bi bi-x-lg"></i></button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-dark mt-2 mb-0" @click="addIngredient()"><i class="bi bi-plus-lg"></i></button>
                  </div>
                  <small class="text-muted pt-0 text-center">Weitere Zutat hinzufügen</small>
                </div>
              </div>

              <h5 class="mt-3">Zubereitung</h5>
              <div class="mt-2">
                <!-- error message -->
                <div class="text-danger" v-if="v$.recipeData.steps.$error">Bitte überprüfe die Schritte auf vollständigkeit</div>
                <div v-for="(step, index) in this.recipeData.steps" :key="index">
                  <div class="row">
                    <div class="col-lg-11 pe-lg-1 mt-3 titleTop">
                      <input v-model="step.title" placeholder="Names des Schrittes" class="form-control rounded-0 rounded-top" type="text" />
                    </div>
                    <div class="col-lg-1 mt-3 ps-lg-1">
                      <button type="button" class="btn btn-danger" @click="removeStep(index)"><i class="bi bi-x-lg"></i></button>
                    </div>
                    <div class="col-lg-11 pe-lg-1 mt-1">
                      <textarea rows="2" v-model="step.description" placeholder="Beschreibung" class="form-control rounded-0 rounded-bottom" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-dark mt-2 mb-0" @click="addStep()"><i class="bi bi-plus-lg"></i></button>
                  </div>
                  <small class="text-muted pt-0 text-center">Weiteren Schritt hinzufügen</small>
                </div>
              </div>

              <h5 class="mt-3">Tags</h5>
              <p class="text-muted mb-2">Wähle aus den Tags, die dein Gericht beschreiben</p>
              <p class="text-danger" v-if="v$.recipeData.tags.$error">Wähle mindestens ein Tag um dein Gericht zu beschreiben</p>
              <div class="form-check form-check-inline mb-2" v-for="tag in userStore.user.tags">
                <input class="form-check-input" type="checkbox" :value="tag" v-model="this.recipeData.tags" :id="tag" />
                <label class="form-check-label" :for="tag"> {{ tag }} </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div v-if="this.success" class="alert alert-success w-100">Das Rezept wurde erstellt</div>
          <div v-if="this.failed" class="alert alert-danger w-100">Das Rezept konnte nicht erstellt werden</div>
          <div class="actions">
            <button v-show="!this.success" type="button" class="btn btn-outline-dark" @click="this.onSaveRecipe()">Speichern</button>
            <button v-show="this.success" type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { minLength, helpers, required } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/auth.store";
import { postAddRecipe } from "../../api/recipeHandling";
export default {
  setup() {
    return { v$: useVuelidate(), userStore: useAuthStore() };
  },
  data() {
    return {
      recipeData: {
        title: null,
        source: "",
        processingTime: null,
        images: null,
        description: null,
        category: null,
        ingredients: [
          {
            name: null,
            amount: null,
            unit: "Gramm",
          },
        ],
        steps: [
          {
            title: null,
            number: 0,
            description: null,
          },
        ],
        tags: [],
      },
      failed: false,
      success: false,
    };
  },
  validations() {
    return {
      recipeData: {
        title: { required },
        processingTime: { required },
        description: { required },
        category: { required },
        ingredients: {
          minLength: minLength(1),
          $each: helpers.forEach({
            name: { required },
            amount: { required },
            unit: { required },
          }),
        },
        steps: {
          minLength: minLength(1),
          $each: helpers.forEach({
            title: { required },
            number: { required },
            description: { required },
          }),
        },
        tags: { required },
      },
    };
  },
  methods: {
    addIngredient() {
      this.recipeData.ingredients.push({
        name: "",
        amount: null,
        unit: "Gramm",
      });
      console.log(this.recipeData.ingredients);
    },
    removeIngredient(index) {
      this.recipeData.ingredients.splice(index, 1);
    },
    addStep() {
      this.recipeData.steps.push({
        title: null,
        number: this.recipeData.steps.length,
        description: null,
      });
      console.log(this.recipeData.ingredients);
    },
    removeStep(index) {
      this.recipeData.steps.splice(index, 1);
    },
    async onSaveRecipe() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      let response = await postAddRecipe(this.recipeData);
      if (response.error) {
        this.failed = true;
        console.log("Error while creating");
        return;
      }
      this.success = true;
      this.v$.$reset();
      this.$refs.recipeData.reset();
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .ingredientCol {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
