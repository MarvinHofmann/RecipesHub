<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand fs-3 me-0" href="#"> RecipesHub </a>
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
        </ul>
        <div class="d-flex dropdown dropdown-area" data-bs-toggle="dropdown" aria-expanded="false">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a role="button" id="btn" class="nav-link"> Marvin </a>
            </li>
            <a href="#" class="mt-2 d-block link-dark text-decoration-none dropdown-toggle avatar">
              <img src="../assets/vue.svg" alt="avatar" width="32" height="32" class="rounded-circle bg-success p-0" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end py-1" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <div class="dropdown-item" type="button"><i class="dropdown-icon bi bi-clipboard-plus"></i> Kategorie erstellen</div>
              </li>
              <li>
                <div class="dropdown-item" type="button"><i class="dropdown-icon bi bi-file-plus"></i> Rezept erstellen</div>
              </li>
              <li>
                <div class="dropdown-item" type="button"><i class="dropdown-icon bi bi-patch-plus"></i> Tag erstellen</div>
              </li>
              <li>
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <div class="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSettings" aria-controls="offcanvasSettings">
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
  <Settings></Settings>
</template>

<script>
import Settings from "./Settings.vue";
export default {
  components: { Settings },
  data() {
    return {};
  },
  methods: {
    onLogout() {
      this.$router.push("/login");
    },
  },
  mounted() {},
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
