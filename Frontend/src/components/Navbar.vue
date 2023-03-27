<template>
  <nav class="print-none navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a @click="this.$router.push('/home')" class="navbar-brand fs-3 me-0" href="#">
        <img src="../assets/logo.png" height="30" />
        RecipesHub
      </a>
      <button
        class="navbar-toggler toggle-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list toggle-icon"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="'/home'" id="btn" class="nav-link" active-class="active"> Home </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/browse'" id="btn" class="nav-link" active-class="active"> Browse </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/wochenPlan'" id="btn" class="nav-link" active-class="active"> Wochenplaner </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/about'" id="btn" class="nav-link" active-class="active"> About </router-link>
          </li>

          <!-- Nav elements only visible if collapsed otherwise in dropdown-->
          <div class="d-lg-none">
            <hr>
            <li class="nav-item ">
              <li>
                <div data-bs-toggle="modal" data-bs-target="#addRecipeModal" class="nav-link" type="button">
                  Rezept erstellen
                </div>
              </li>
            </li>
            <li class="nav-item ">
              <div data-bs-toggle="modal" data-bs-target="#addCategoryModal" class="nav-link" type="button">
                  Kategorie erstellen
                </div>
            </li>
            <li class="nav-item ">
              <div data-bs-toggle="modal" data-bs-target="#addTagModal" class="nav-link" type="button">
                  Tag erstellen
                </div>
            </li>
            <li class="nav-item">
              <div class="nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings" aria-controls="offcanvasSettings">
                Einstellungen
              </div>
            </li>
          </div>
        </ul>
        <div class="d-flex dropdown dropdown-area d-none d-lg-block" data-bs-toggle="dropdown" aria-expanded="false">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a role="button" id="btn" class="nav-link"> {{ this.userStore.user.username }} </a>
            </li>
            <a href="#" class="mt-2 d-block link-dark text-decoration-none dropdown-toggle avatar">
              <img src="../assets/vue.svg" alt="avatar" width="32" height="32" class="rounded-circle bg-success p-0" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end py-1" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <div data-bs-toggle="modal" data-bs-target="#addRecipeModal" class="dropdown-item" type="button">
                  <i class="dropdown-icon bi bi-file-plus"></i> Rezept erstellen
                </div>
              </li>
              <li>
                <div data-bs-toggle="modal" data-bs-target="#addCategoryModal" class="dropdown-item" type="button">
                  <i class="dropdown-icon bi bi-clipboard-plus"></i> Kategorie erstellen
                </div>
              </li>
              <li>
                <div data-bs-toggle="modal" data-bs-target="#addTagModal" class="dropdown-item" type="button">
                  <i class="dropdown-icon bi bi-patch-plus"></i> Tag erstellen
                </div>
              </li>
              <li>
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <div
                  class="dropdown-item"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSettings"
                  aria-controls="offcanvasSettings"
                >
                  <i class="dropdown-icon bi bi-gear"></i>
                  Einstellungen
                </div>
              </li>
              <li>
                <a id="btn" class="dropdown-item" type="button" @click="onLogout"><i class="dropdown-icon bi bi-box-arrow-in-left"></i> Ausloggen </a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <section class="d-flex justify-content-center justify-content-lg-between p-0 border-bottom"></section>
  <Alert ref="alert" :message="'Alert Message'"></Alert>
  <Settings></Settings>
  <AddRecipe @save="this.onAddRecipe()" id="addRecipeModal"></AddRecipe>
  <AddCategory id="addCategoryModal"></AddCategory>
  <AddTag id="addTagModal"></AddTag>
</template>

<script>
import Alert from "./Alert.vue";
import Settings from "./Settings.vue";
import AddRecipe from "./Modals/AddRecipe.vue";
import { useAuthStore } from "../stores/auth.store";
import AddCategory from "./Modals/AddCategory.vue";
import AddTag from "./Modals/AddTag.vue";
export default {
  setup() {
    return { userStore: useAuthStore() };
  },
  components: { Settings, AddRecipe, Alert, AddTag, AddCategory },
  methods: {
    onLogout() {
      this.$router.push("/login");
      this.userStore.logout();
    },
    onAddRecipe() {
      this.$refs.alert.showAlert();
    },
  },
};
</script>

<style scoped>
.dropdown-area {
  cursor: pointer;
}

.dropdown-item {
  vertical-align: middle;
}

.dropdown-icon {
  margin-top: 0;
  margin-right: 7px;
}

.navbar-nav .show > .nav-link,
.navbar-nav .nav-link.active {
  padding-bottom: 0;
  border-bottom: 3px solid rgba(0, 0, 0, 0.8) !important;
  font-weight: 600;
}
.avatar {
  margin-top: 5%;
  line-height: 40px;
}
#avatar:hover {
  opacity: 60%;
}
#image:hover {
  opacity: 60%;
  cursor: pointer;
}
@media screen and (min-width: 992px) {
  .nav-item {
    line-height: 40px;
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
