<template>
  <Navbar></Navbar>
  <div class="container mt-5">
    <h3 class="mb-0">
      Dein Persönlicher Wochenplan
      <i class="bi bi-pencil-square float-end fs-5 mt-1" type="button"></i>
    </h3>
    <div class="d-flex justify-content-center mt-3">
      <div class="row w-100">
        <div v-for="day in days" class="col-1 px-0">
          <div class="card calendarElement" @click="this.onAddRecipeToData(day.date)">
            <p class="p-0 ps-1 m-0 text-muted">{{ day.date }}</p>
            <div class="card-body px-1">
              <div
                v-for="recipe in day.recipes"
                :style="{ backgroundColor: recipe.color }"
                class="text w-100"
                type="button"
                @click="this.$router.push('/rezept/' + recipe.id)"
              >
                {{ recipe.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-lg-12">
        <button class="btn btn-outline-dark">Einkaufsliste Erstellen</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      days: [
        {
          date: "Mo. 1.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#1e97f3",
              id: "641a280868e7825d5922cf33",
            },
          ],
        },
        {
          date: "Di. 2.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#127f3e",
            },
          ],
        },
        {
          date: "Mi. 3.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#1e97f3",
            },
            {
              title: "Rezept 1",
              color: "#9997f3",
            },
          ],
        },
        {
          date: "Do. 4.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#1a97f3",
            },
          ],
        },
        {
          date: "Fr. 5.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#1e9733",
            },
          ],
        },
        {
          date: "Sa. 6.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#2e97f3",
            },
          ],
        },
        {
          date: "So. 7.3",
          recipes: [
            {
              title: "Rezept 1",
              color: "#1e67f3",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onAddRecipeToData(date){
      console.log("Add to ", date);
    }
  }
};
</script>

<style scoped>
/** lg bootstrap breakpoint */
@media screen and (min-width: 992px) {
  .col-1 {
    width: calc(100% / 7);
  }
}

/** md bootstrap break point */
@media screen and (min-width: 720px) and (max-width: 992px) {
  .col-1 {
    width: calc(100% / 3);
  }
}

@media screen and (max-width: 720px) {
  .col-1 {
    width: calc(100% / 3);
  }
}

.text {
  margin-top: 5px;
  text-align: center;
  border-radius: 5%;
  color: white;
}

.calendarElement {
  height: 150px;
}
</style>
