<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-5 col-lg-6">
        <div class="card card-body shadow">
          <div class="col-lg-12 fs-2">
            <img src="../assets/logo.png" width="40" />
            RecipesHub
          </div>
          <div class="col-lg-12 text-center mt-3">
            <h2 class="fw-bold">Anmelden</h2>
            <p class="text-muted">Bitte melde dich mit deinen Daten an.</p>
          </div>
          <form>
            <div class="mb-3">
              <label for="username" class="form-label">Benutzername</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder=""
                  v-model="v$.form_login.username.$model"
                  :class="{ 'is-invalid': v$.form_login.username.$error }"
                />
              </div>
              <!-- error message -->
              <div class="text-danger" v-if="v$.form_login.username.$error">Username fehlt</div>
            </div>
            <div class="mb-3">
              <label for="pass" class="form-label">Passwort</label>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  v-model="v$.form_login.password.$model"
                  :class="{ 'is-invalid': v$.form_login.password.$error }"
                />
              </div>
              <!-- error message -->
              <div class="text-danger" v-if="v$.form_login.password.$error">Passwort fehlt</div>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Angemeldet bleiben?</label>
            </div>

            <!--Loading Spinner-->
            <div class="text-center">
              <div class="spinner-border text-primary mt-2" role="status" v-if="this.loading">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <div v-if="this.error_text != ''" class="alert alert-danger" role="alert">{{ this.error_text }}</div>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                role="button"
                class="btn btn-outline-dark my-2"
                @click="sign_in()"
                v-if="!this.loading"
                :disabled="v$.form_login.$invalid"
              >
                Anmelden
              </button>
            </div>
            <p class="text-muted text-center mt-2">Oder mit Google anmelden</p>
            <div class="d-flex justify-content-center">
              <i class="bi bi-google text-center"></i>
            </div>
            <p class="text-muted text-center mt-2">
              Kein Account?
              <a class="link" type="button">
                <router-link :to="'/registrieren'" id="btn" class="dropdown-item pt-0">Hier klicken zum registrieren.</router-link></a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form_login: {
        username: null,
        password: null,
      },
      error_text: "",
      loading: false,
    };
  },
  methods: {
    async sign_in() {
      this.loading = true;
      this.error_text = "";
      this.loading = false;
      this.$router.push("/home");
    },
  },
  validations() {
    return {
      form_login: {
        username: { required },
        password: { required },
      },
    };
  },
};
</script>

<style scoped></style>
