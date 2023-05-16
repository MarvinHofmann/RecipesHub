<template>
  <Navbar></Navbar>
  <div class="container mt-3" v-if="this.recipeData && !this.loading">
    <!--Alert-->
    <div class="col-lg-12">
      <Alert ref="alert" :message="'Das Rezept konnte nicht gelöscht werden.'"></Alert>
    </div>
    <!-- Recipe Header Image and Meta Data -->
    <div class="row">
      <div class="col-lg-6">
        <div class="card h-100 p-0 border-0">
          <img :src="this.imgSrc" class="recipeImage img-fluid" @error="this.imgSrc = '../../public/placeholder.png'" />
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
                <p class="mb-0">{{ this.recipeData.cookingTime }} Minuten</p>
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
          <div class="card-footer bg-white border-0 print-none">
            <!--Action Buttons-->
            <div class="row">
              <div class="col-6 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onAddToList()">Auf die Einkaufsliste</button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onDownloadPDF()">
                  <i class="bi bi-cloud-download fs-6" v-if="!this.loadingDownload"></i>
                  <div class="spinner-border spinner-border-sm" role="status" v-else>
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100" @click="this.onEditRecipe()"><i class="bi bi-pencil-square"></i></button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#sureDeleteRecipe">
                  <i class="bi bi-trash"></i>
                </button>
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
          <input
            type="number"
            min="1"
            max="200"
            :value="this.recipeData.portions"
            id="portions"
            class="form-control"
            @change="onPortionChange($event)"
          />
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
            <div class="accordion-item" v-for="(step, index) in this.recipeData.steps" :key="index" :id="'stepAccordion' + index">
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
  <!-- backdrop & spinner -->
  <div class="backdrop_load" v-else>
    <div class="text-center loading">
      <div class="loading_card d-flex justify-content-center shadow-lg bg-light rounded">
        <div class="spinner-border-self text-dark" role="status">
          <span class="d-none">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <DeleteRecipe id="sureDeleteRecipe" :deleteText="'Wollen Sie das Rezept wirklich löschen?'" @delete="this.onDeleteRecipe()"></DeleteRecipe>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { getRecipeWithID, deleteRecipe, downloadPDF } from "../api/recipeHandling";
import Alert from "../components/Alert.vue";
import DeleteRecipe from "../components/Modals/SureDelete.vue";
import { addToList } from "../api/shoppingListHandling";
export default {
  components: {
    Navbar,
    Alert,
    DeleteRecipe,
  },
  data() {
    return {
      recipeData: null,
      imgSrc: "http://via.placeholder.com/640x360",
      truncated: true,
      loading: false,
      loadingDownload: false,
      portions: 0,
    };
  },
  methods: {
    async onDeleteRecipe() {
      let res = await deleteRecipe(this.recipeData._id);
      if (res.error) {
        this.$refs.alert.showAlert();
      } else {
        this.$router.push(this.$router.options.history.state.back);
      }
    },
    onEditRecipe() {
      console.log("Edit Recipe");
    },
    async onAddToList() {
      console.log("Add to List");
      this.recipeData.ingredients.forEach(element => {
        console.log(element.name, element.unit);
        addToList(element)
      });
    },
    /**
     * fires if user Downloads the Recipe
     */
    async onDownloadPDF() {
      this.loadingDownload = true;
      console.log("Download PDF");
      let res = await downloadPDF(this.recipeData._id,this.recipeData.portions);
      if (res.error) {
        this.loadingDownload = false;
        return;
      }
      console.log(res.data);
      // Create fake button and trigger it to download the file as PDF with the recipe name as pdf name
      const fileURL = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", this.recipeData.title + ".pdf");
      document.body.appendChild(fileLink);
      fileLink.click();
      this.loadingDownload = false;
    },
    /**
     * Recalculates the quantities of the ingredients
     * based on the changed number of portions
     * @param {*} event @change Event of the Input
     */
    onPortionChange(event) {
      let portions = event.target.value;
      let initPortions = this.recipeData.portions;
      this.recipeData.portions = event.target.value;
      this.recipeData.ingredients.forEach((ingredient) => {
        ingredient.amount = ((ingredient.amount / initPortions) * portions).toFixed(2);
      });
    },
  },
  async mounted() {
    this.loading = true;
    let res = await getRecipeWithID(this.$route.params.id);
    if (res.error) {
      this.$router.push("/404");
      return;
    }
    this.recipeData = res.data;
    this.imgSrc = res.data.imgSrc;
    this.loading = false;
  },
};
</script>

<style scoped>
.recipeImage {
  object-fit: contain;
  width: 100%;
  height: 100%;
  max-height: 400px;
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

.loading {
  position: relative;
  margin: 0;
  width: 90%;
  height: 100%;
}

.loading_card {
  align-items: center;
  position: fixed;
  top: calc(50% - (150px / 2));
  right: calc(50% - (150px / 2));
  opacity: 1;
  height: 150px;
  width: 150px;
}

.spinner-border-self {
  position: fixed;
  opacity: 0.7;
  height: 60px;
  width: 60px;
}

.backdrop_load {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
}
</style>
