<template>
  <Navbar></Navbar>
  <div class="container mt-3" v-if="this.recipeData">
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
                <p class="mb-0">{{ this.recipeData.source }}</p>
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
              <div class="col-8 px-1 mt-3">
                <button class="btn btn-outline-dark w-100">Auf die Einkaufsliste</button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100"><i class="bi bi-file-earmark-arrow-down"></i></button>
              </div>
              <div class="col-2 px-1 mt-3">
                <button class="btn btn-outline-dark w-100"><i class="bi bi-pencil"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Portions Calculator with Ingredients -->
    <div class="row mt-3 align-items-center d-flex justify-content-center">
      <div class="col-2 me-2 text-end fs-4">
        <div id="portionsInline">Portionen:</div>
      </div>
      <div class="col-2">
        <input type="number" min="1" :value="this.recipeData.portions" id="portions" class="form-control" />
      </div>
    </div>

    <div class="row mt-3 d-flex justify-content-center">
      <div class="table-responsive w-50">
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
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { getRecipeWithID } from "../api/recipeHandling";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      recipeData: null,
      imgSrc: "http://via.placeholder.com/640x360",
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    let res = await getRecipeWithID(this.$route.params.id);
    if (res.error) {
      this.$router.push("/404");
      return;
    }
    this.recipeData = res.data;
    console.log(res.data);
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
</style>
