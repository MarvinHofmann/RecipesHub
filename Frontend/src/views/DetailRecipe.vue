<template>
  <Navbar></Navbar>
  <div class="container mt-3" v-if="this.recipeData">
    <!--Alert-->
    <div class="col-lg-12">
      <Alert ref="alert" :message="'Das Rezept konnte nicht gelöscht werden.'"></Alert>
    </div>
    <!-- Recipe Header Image and Meta Data -->
    <div class="row">
      <div class="col-lg-6">
        <div class="card card-body h-100 p-0">
          <img :src="this.imgSrc" class="recipeImage" />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <h2>{{ this.recipeData.title }}</h2>
            <template v-for="item in this.recipeData.tags">
              <span class="badge rounded-pill text-bg-secondary me-2">{{ item }}</span>
            </template>

            <!--Metadaten-->
            <div class="row">
              <div class="col-lg-4 col-md-4 col-6 mt-2">
                <p class="mb-0 text-muted">Dauer</p>
                <p class="mb-0">{{ this.recipeData.processingTime }} Minuten</p>
              </div>
              <div class="col-lg-4 col-md-4 col-6 mt-2">
                <p class="mb-0 text-muted">Kategorie</p>
                <p class="mb-0">{{ this.recipeData.category }}</p>
              </div>
              <div class="col-lg-12 mt-2">
                <p class="mb-0 text-muted">Quelle</p>
                <p class="mb-0 text-truncate" @click="this.truncated = !this.truncated" v-if="this.truncated">
                  {{ this.recipeData.source }}
                </p>
                <p class="mb-0 text" @click="this.truncated = !this.truncated" v-else>{{ this.recipeData.source }}</p>
              </div>
              <div class="col-lg-12 mt-2">
                <p class="mb-0 text-muted">Beschreibung</p>
                <p class="mb-0">{{ this.recipeData.description }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white border-0">
            <!--Action Buttons-->
            <div class="row">
              <div class="col-6 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onAddToList()">Auf die Einkaufsliste</button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onDownloadPDF()"><i class="bi bi-file-earmark-arrow-down"></i></button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onEditRecipe()"><i class="bi bi-pencil"></i></button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#sureDeleteRecipe"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portions Calculator -->
    <div class="row mt-4 align-items-center d-flex justify-content-center">
      <div class="col-6 text-end fs-4">
        <div id="portionsInline">Portionen:</div>
      </div>
      <div class="col-6">
        <div class="col-lg-2 col-md-4 col-6">
          <input type="number" min="1" :value="this.recipeData.portions" id="portions" class="form-control" />
        </div>
      </div>
    </div>

    <div class="row">
      <!--Ingredients-->
      <div class="col-lg-6 mt-3">
        <h4 class="text-center">Zutaten</h4>
        <div class="row mt-3 d-flex justify-content-center">
          <div class="table-responsive w-100 w-lg-50">
            <table class="table table-striped">
              <tbody>
                <tr v-for="ingredient in this.recipeData.ingredients">
                  <td class="leftTable text-end w-50">
                    {{ ingredient.name }}
                  </td>
                  <td class="rightTable text-start w-50">{{ ingredient.amount }} {{ ingredient.unit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!--Steps-->
      <div class="col-lg-6 mt-3">
        <h4 class="text-center">Zubereitung</h4>
        <div class="row mt-3">
          <div class="accordion">
            <div
              class="accordion-item"
              v-for="(step, index) in this.recipeData.steps"
              :key="index"
              :id="'stepAccordion' + index"
            >
              <h2 class="accordion-header" id="headingStep">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse_step' + index"
                  aria-expanded="true"
                  :aria-controls="'collapse_step' + index"
                >
                  <div class="text-muted">{{ step.number }}. {{ step.title }}<b></b></div>
                </button>
              </h2>

              <div
                :id="'collapse_step' + index"
                class="accordion-collapse collapse show"
                aria-expanded="false"
                aria-labelledby="headingSteep"
                :data-bs-parent="'#stepAccordion' + index"
              >
                <div class="accordion-body">
                  <p class="">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteRecipe id="sureDeleteRecipe" :deleteText="'Wollen Sie das Rezept wirklich löschen?'" @delete="this.onDeleteRecipe()"></DeleteRecipe>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { getRecipeWithID, deleteRecipe } from "../api/recipeHandling";
import Alert from "../components/Alert.vue";
import DeleteRecipe from "../components/Modals/SureDelete.vue";
export default {
  components: {
    Navbar,
    Alert,
    DeleteRecipe
  },
  data() {
    return {
      recipeData: null,
      imgSrc: "http://via.placeholder.com/640x360",
      truncated: true,
    };
  },
  methods: {
    async onDeleteRecipe() {
      console.log("Delete Recipe");
      let res = await deleteRecipe(this.recipeData._id);
      if (res.error) {
        this.$refs.alert.showAlert();
      } else {
        this.$router.push("/home");
      }
    },
    onEditRecipe() {
      console.log("Edit Recipe");
    },
    onAddToList() {
      console.log("Add to List");
    },
    onDownloadPDF() {
      console.log("Download PDF");
    },
  },
  async mounted() {
    let res = await getRecipeWithID(this.$route.params.id);
    if (res.error) {
      this.$router.push("/404");
      return;
    }
    this.recipeData = res.data;
  },
};
</script>

<style scoped>
.recipeImage {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

/** Alwasy show arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

.accordion-button {
  background-color: var(--bs-light);
  box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
}

.text-bg-secondary {
  background-color: transparent !important;
  color: var(--bs-secondary) !important;
  border: solid 1px var(--bs-secondary) !important;
}
</style>
