<template>
  <Navbar></Navbar>
  <div class="container">
    <!-- Hero Section, visible if user just Logged In-->
    <Transition name="fade">
      <div class="row mx-0 mt-3" v-if="this.justLoggedIn">
        <div class="alert alert-light border text-center alert-dismissible fade show">
          <h1 class="text-dark">Hallo {{ this.userStore.user.username }}, schön dich zu sehen.</h1>
          <button type="button" class="btn-close text-reset" @click="this.justLoggedIn = false" aria-label="Close"></button>
        </div>
      </div>
    </Transition>

    <div class="row">
      <div class="col-md-6 mt-3">
        <div class="card card-body h-100">
          <h5>Einkaufsliste</h5>
          <div class="hide-overflow">
            <div class="ms-2 form-check" v-for="(item, index) in this.shoppingList">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                :id="'formCheckShopping' + index"
                v-model="this.shoppingList[index]"
                @click="this.onDeleteElementFromList(item.name, item.unit)"
              />
              <label class="form-check-label" :for="'formCheckShopping' + index" :ref="'label' + index">
                {{ item.name }}
                <div class="text-muted d-inline">{{ item.amount }} {{ item.unit }}</div></label
              >
            </div>
          </div>
          <div class="input-group input-group-sm mt-2">
            <input type="text" placeholder="Artikel" class="form-control" v-model="this.listElement.name" />
            <input type="number" placeholder="Anzahl" class="form-control" v-model="this.listElement.amount" />
            <select class="form-select text-muted" placeholder="Einheit" v-model="this.listElement.unit">
              <option class="text-muted" selected disabled hidden>Einheit</option>
              <option>Gramm</option>
              <option>Milliliter</option>
              <option>Esslöffel</option>
              <option>Teelöffel</option>
              <option>Tasse</option>
              <option>Glas</option>
              <option>Bund</option>
              <option>Packung</option>
              <option>Stück</option>
            </select>
            <button class="btn btn-outline-success" type="button" @click="this.onAddToShoppingList()"><i class="bi bi-bag-plus"></i></button>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card card-body h-100">
          <h5>Wochenplan</h5>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div>
      <h3 class="mt-4">Wie wäre es mit?</h3>
      <hr class="mt-0 mb-0" />
    </div>

    <div class="row mt-4" v-if="this.randomRecipes && !this.loading">
      <RecipeCard
        v-for="item in randomRecipes"
        :recipe-name="item.title"
        :category="item.category"
        :tags="item.tags"
        :duration="item.cookingTime"
        :recipeID="item._id"
        :image="item.imgSrc"
      ></RecipeCard>
    </div>
    <div class="row mt-3" v-else>
      <SceletonCard v-for="item in 4" />
    </div>

    <div class="float-end mt-0">
      <button class="btn btn-outline-dark" @click="this.$router.push('/browse')">Alle Browse</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { useAuthStore } from "../stores/auth.store";
import RecipeCard from "../components/RecipeCard.vue";
import { getRandomRecipes } from "../api/recipeHandling";
import SceletonCard from "../components/SceletonCard.vue";
import { getList, addToList, removeFromList } from "../api/shoppingListHandling";
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: {
    Navbar,
    RecipeCard,
    SceletonCard,
  },
  data() {
    return {
      justLoggedIn: false,
      randomRecipes: [],
      loading: false,
      shoppingList: [],
      listElement: {
        name: null,
        amount: null,
        unit: "Einheit",
      },
      checked: false,
    };
  },
  methods: {
    async onAddToShoppingList() {
      // Add to DB
      let res = await addToList(this.listElement);
      this.shoppingList = res;
    },
    async onDeleteElementFromList(name, unit) {
      // Delete from DB
      let res = await removeFromList(name, unit);
      this.shoppingList = res;
    },
  },
  async mounted() {
    this.loading = true;
    this.justLoggedIn = this.$router.options.history.state.back == "/login";
    this.shoppingList = await getList();
    console.log(this.shoppingList);
    let res = await getRandomRecipes();
    if (res.error) {
      // Show error
      return;
    }
    this.randomRecipes = res.data;

    setTimeout(() => {
      this.justLoggedIn = false;
    }, 5000);
    this.loading = false;
  },
};
</script>

<style scoped>
.hide-overflow {
  max-height: 200px;
  overflow-y: scroll;
}
/* https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgb(194, 193, 193);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
