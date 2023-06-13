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

          <div v-if="this.$route.query.sessionExpired" class="alert alert-warning">Deine Sitzung ist abgelaufen, bitte melde dich erneut an.</div>

          <form>
            <div class="mb-3">
              <label for="username" class="form-label">Benutzername</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder=""
                  v-model="this.formLogin.username"
                  :class="{ 'is-invalid': v$.formLogin.username.$error }"
                />
              </div>
              <!-- error message -->
              <div class="text-danger" v-if="v$.formLogin.username.$error">Username fehlt</div>
            </div>
            <div class="mb-3">
              <label for="pass" class="form-label">Passwort</label>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  v-model="this.formLogin.password"
                  :class="{ 'is-invalid': v$.formLogin.password.$error }"
                />
              </div>
              <!-- error message -->
              <div class="text-danger" v-if="v$.formLogin.password.$error">Passwort fehlt</div>
            </div>

            <div class="mb-3 form-check">
              <input v-model="this.formLogin.rememberMe" type="checkbox" class="form-check-input" id="rememberme" />
              <label class="form-check-label" for="rememberme">Angemeldet bleiben?</label>
            </div>

            <!--Loading Spinner-->
            <div class="text-center">
              <div class="spinner-border text-dark mt-2" role="status" v-if="this.loading">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <div v-if="this.error_text != ''" class="alert alert-danger" role="alert">{{ this.error_text }}</div>
            <div class="d-flex justify-content-center">
              <button type="button" role="button" class="btn btn-outline-dark my-2" @click="this.onSignIn()" v-if="!this.loading">Anmelden</button>
            </div>
            <p class="text-muted text-center my-2">Oder mit Google anmelden</p>
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
import { useAuthStore } from "../stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {
    userStore: null,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      formLogin: {
        username: null,
        password: null,
        rememberMe: false,
      },
      error_text: "",
      loading: false,
    };
  },
  methods: {
    async onSignIn() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.loading = true;
      this.error_text = "";
      this.userStore = useAuthStore();
      let res = await this.userStore.login(this.formLogin.username, this.formLogin.password, this.formLogin.rememberMe);
      if (res.error) {
        console.log(res.error);
        this.error_text = res.error;
      } else {
        //this.$router.push("/home");
      }
      this.loading = false;
    },
  },
  validations() {
    return {
      formLogin: {
        username: { required },
        password: { required },
      },
    };
  },
};
</script>

<style scoped></style>
