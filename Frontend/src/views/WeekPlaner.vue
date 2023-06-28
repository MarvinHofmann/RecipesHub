<template>
  <Navbar></Navbar>
  <div class="container mt-5">
    <h3 class="mb-0">
      Dein Persönlicher Wochenplan
    </h3>
    <div class="d-flex justify-content-center mt-3">
      <div class="row w-100">
        <div v-for="day in days" class="col-1 px-0">
          <div class="card calendarElement">
            <div class="row mx-1">
              <p class="col-9 p-0 ps-1 m-0 text-muted">{{ getFormattedDate(day.date) }}</p>
              <div class="col-3" type="button" @click="this.onHandleEntry(null, day.date, 'addRecipe')"><i class="bi bi-plus-circle"></i></div>
            </div>
            <div class="card-body px-1">
              <div v-for="recipe in day.recipes" type="button" @click.self="this.$router.push('/rezept/' + recipe.id)">
                <div class="row mx-1">
                  <div :style="{ backgroundColor: recipe.color }" class="text-left col-9 float-start" @click="this.onHandleEntry(recipe, null, 'goToElement')">{{ recipe.title }}</div>
                  <i :style="{ backgroundColor: recipe.color }" type="button" @click="this.onHandleEntry(recipe, null, 'deleteElement')"
                    class="float-end col-3 text-right text-danger bi bi-trash-fill"></i>
                </div>
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
  <AddRecipeToPlan id="addToDate" :date="this.dateToAdd"></AddRecipeToPlan>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AddRecipeToPlan from "../components/Modals/AddRecipeToPlan.vue";
import { Modal } from "bootstrap";
import { getDates } from "../api/weekPlanHandling"
export default {
  components: {
    Navbar,
    AddRecipeToPlan,
  },
  data() {
    return {
      dateToAdd: null,
      days: [
        {
          date: new Date(),
          recipes: [
            {
              title: "Rezept 1",
              color: "#1e97f3",
              id: "641ed8f3250b03f73e5e2ca9",
            },
          ],
        },
        {
          date: new Date(),
        },
        {
          date: new Date(),
        },
        {
          date: new Date(),
          recipes: [
            {
              title: "Rezept 1",
              color: "#1a97f3",
            },
          ],
        },
        {
          date: new Date(),
          recipes: [
            {
              title: "Rezept 1",
              color: "#da97f1",
            },
          ],
        },
        {
          date: new Date(),
        },
        {
          date: new Date(),
        },
      ],
    };
  },
  methods: {
    onHandleEntry(recipe, date, mode) {
      console.log(mode)
      switch (mode) {
        case "addRecipe":
          if (this.$router.options.history.state.current != "/wochenPlan") return;
          console.log("Add to ", date);
          const saveModal = document.getElementById("addToDate");
          const modal = new Modal(saveModal);
          this.dateToAdd = date;
          modal.toggle();
          break;

        case "deleteElement":
          console.log("DELETE ", recipe);
          break;

        case "goToElement":
          console.log("GOTO RECIPE ", recipe);
          this.$router.push("/rezept/" + recipe.id)
          break;
      }
    },
    getFormattedDate(date) {
      return new Date(date).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" });
    },
  },
  async mounted() {
    let dates = await getDates()
    dates.forEach(date => {
      console.log(date);
    });
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

.text-left {
  margin-top: 5px;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
  color: white;
}

.text-right {
  margin-top: 5px;
  border-top-right-radius: 15%;
  border-bottom-right-radius: 15%;
  color: white;
}

.calendarElement {
  height: 150px;
}
</style>
