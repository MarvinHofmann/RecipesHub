<template>
  <Navbar></Navbar>
  <div class="container mt-5">
    <h3 class="mb-0">
      Dein Persönlicher Wochenplan
    </h3>
    <div class="d-flex justify-content-center mt-3">
      <div class="row w-100">
        <div v-for="day in days" class="col-1 px-0">
          <div :class="{ 'currentDay': isCurrentDate(day.date) }" class="card calendarElement">
            <div class="d-flex justify-content-between">
              <div class="px-1 text-muted">{{ getFormattedDate(day.date) }}</div>
              <div class="px-1 text-end bi bi-plus-circle" type="button" @click="this.onHandleEntry(null, day.date, 'addRecipe')"></div>
            </div>
            <div class="card-body px-1">
              <div v-for="recipe in day.recipes" type="button" @click.self="this.$router.push('/rezept/' + recipe.id)">
                <div class="d-flex justify-content-between badge rounded-pill text-bg-secondary w-100">
                  <div class="text-truncate" @click="this.onHandleEntry(recipe, day.date, 'goToElement')">{{ recipe.title }}</div>
                  <div class="text-danger bi bi-trash-fill" type="button" @click="this.onHandleEntry(recipe, day.date, 'deleteElement')"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-lg-12 mt-3">
        <ShoppingList></ShoppingList>
      </div>
    </div>
  </div>
  <AddRecipeToPlan id="addToDate" :date="this.dateToAdd" @done="this.getPlanAfterNew()"></AddRecipeToPlan>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AddRecipeToPlan from "../components/Modals/AddRecipeToPlan.vue";
import { Modal } from "bootstrap";
import { getDates, deleteRecipeFromDate } from "../api/weekPlanHandling"
import ShoppingList from "../components/ShoppingList.vue";
export default {
  components: {
    Navbar,
    AddRecipeToPlan,
    ShoppingList
  },
  data() {
    return {
      dateToAdd: null,
      days: [],
    };
  },
  methods: {
    async onHandleEntry(recipe, date, mode) {
      switch (mode) {
        case "addRecipe":
          if (this.$router.options.history.state.current != "/wochenPlan") return;
          const saveModal = document.getElementById("addToDate");
          const modal = new Modal(saveModal);
          this.dateToAdd = date;
          modal.toggle();
          break;

        case "deleteElement":
          this.days = await deleteRecipeFromDate(recipe, date)
          break;

        case "goToElement":
          this.$router.push("/rezept/" + recipe.recipeID)
          break;
      }
    },
    getFormattedDate(date) {
      return new Date(date).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" });
    },
    isCurrentDate(date) {
      return new Date().toDateString() === new Date(date).toDateString();
    },
    async getPlanAfterNew() {
      // Wait a seccond then load recipes for dates
      setTimeout(async () => {
        this.days = await getDates();
      }, 1000);
    }
  },
  async mounted() {
    this.days = await getDates();
  }
};
</script>

<style scoped>
/** lg bootstrap breakpoint */
@media screen and (min-width: 992px) {
  .col-1 {
    width: calc(100% / 3);
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

.badge {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}


.text-bg-secondary {
  background-color: transparent !important;
  color: var(--bs-secondary) !important;
  border: solid 1px var(--bs-secondary) !important;
}

.text-bg-secondary:hover {
  background-color: var(--bs-secondary) !important;
  color: var(--bs-light) !important;
}

.calendarElement {
  height: 250px;
}

.currentDay {
  background-color: var(--bs-light);
  border-color: var(--bs-secondary);
}
</style>
