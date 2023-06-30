<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-6 col-lg-8">
        <div class="card card-dark card-body shadow">
          <div class="col-lg-12 fs-2">
            <img src="../assets/logo.png" width="40" />
            RecipesHub
          </div>
          <div class="col-lg-12 text-center mt-3">
            <h2 class="fw-bold">Registrieren</h2>
            <p class="text-muted">Registirere dich bei RecipesHub.</p>
          </div>
          <div v-if="this.showValidationError" class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" role="img" aria-label="Danger:"></i>
            <div>Bitte überprüfen Sie ihre eingaben und versuchen Sie es erneut.</div>
          </div>
          <Alert ref="alert" :message="this.alert.alertMessage" :type="this.alert.type"></Alert>

          <!-- User Data form -->
          <form>
            <!-- Row1 Vorname | Name -->
            <div class="row">
              <div class="col-lg-6 mb-3">
                <label for="vorname" class="form-label">Vorname</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="vorname" placeholder="" v-model="this.formRegister.firstName" :class="{ 'is-invalid': v$.formRegister.firstName.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.firstName.$error">Vorname fehlt</div>
              </div>

              <div class="col-lg-6 mb-3">
                <label for="nachname" class="form-label">Nachname</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="nachname" placeholder="" v-model="this.formRegister.lastName" :class="{ 'is-invalid': v$.formRegister.lastName.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.lastName.$error">Nachname fehlt</div>
              </div>
            </div>

            <!-- Row2 Username | Email -->
            <div class="row">
              <div class="col-lg-6 mb-3">
                <label for="username" class="form-label">Username</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="username" placeholder="" v-model="this.formRegister.username" :class="{ 'is-invalid': v$.formRegister.username.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.username.$error">Ungültiger Username</div>
              </div>

              <div class="col-lg-6 mb-3">
                <label for="email" class="form-label">Email</label>
                <div class="input-group">
                  <input type="email" class="form-control" id="email" placeholder="" v-model="this.formRegister.email" :class="{ 'is-invalid': v$.formRegister.email.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.email.$error">Keine gültige Email Adresse.</div>
              </div>
            </div>

            <!-- Row2 Passwort | Passwort Wiederholen -->
            <div class="row">
              <div class="col-lg-6 mb-3">
                <label for="password" class="form-label">Passwort</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="password" placeholder="" v-model="this.formRegister.password" @blur="v$.formRegister.password.$touch"
                    :class="{ 'is-invalid': v$.formRegister.repeatPassword.$error, 'is-invalid': v$.formRegister.password.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.password.$error">Passwort muss mindestens 6 Zeichen lang sein.</div>
                <div class="text-danger" v-else-if="v$.formRegister.repeatPassword.$error">Passwörter stimmen nicht überein</div>
              </div>

              <div class="col-lg-6 mb-3">
                <label for="passwordre" class="form-label">Passwort Wiederholen</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="passwordre" placeholder="" @blur="v$.formRegister.repeatPassword.$touch" v-model="this.formRegister.repeatPassword"
                    :class="{ 'is-invalid': v$.formRegister.repeatPassword.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.formRegister.repeatPassword.$error">Passwörter stimmen nicht überein</div>
              </div>
            </div>

            <!-- Register Button and Google sign in -->
            <div class="d-flex justify-content-center">
              <button type="button" role="button" class="btn btn-outline-dark my-2" @click="onRegister" :class="{ shake: this.showValidationError }">
                <div v-if="this.loadingSpinner" class="spinner-border text-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>Registrieren</div>
              </button>
            </div>
            <p class="text-muted text-center mt-2">
              Sie haben bereits einen Account?
              <a class="link" type="button"> <router-link :to="'/login'" id="btn" class="dropdown-item pt-0">Zum Login.</router-link></a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";
import { registerUser } from "../api/userHandling";
import Alert from "../components/Alert.vue";
export default {
  components: { Alert },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      showValidationError: false,
      formRegister: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
        repeatPassword: null,
      },
      loadingSpinner: false,
      alert: {
        alertMessage: null,
        type: "alert-danger",
      },
    };
  },
  methods: {
    /**
     *  This function handles the registration of a user by validating user inputs and sending them to the server for registration.
     *  It first checks if the form input is valid, and if not, it displays a validation error.
     *  Then it sends the registration data to the server using the registerUser function.
     *  If the server returns an error, an alert message is displayed to the user.
     *  If registration is successful, a success message is displayed and the user is redirected to the login page after 3 seconds.
     */
    async onRegister() {
      this.showValidationError = false;
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.showValidationError = true;
        return;
      }
      this.loadingSpinner = true;
      let response = await registerUser(this.formRegister);
      if (response.error) {
        this.alert.type = "alert-danger";
        this.alert.alertMessage = response.error;
        this.$refs.alert.showAlert();
      } else {
        this.alert.alertMessage = "Erfolgreich Regisriert. Sie werden automatisch weitergeleitet.";
        this.alert.type = "alert-success";
        this.$refs.alert.showAlert();
        setTimeout(() => this.$router.push("/login"), 2000);
      }
      this.loadingSpinner = false;
    },
  },
  validations() {
    return {
      formRegister: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        username: { required },
        password: { required, minLengthValue: minLength(6) },
        repeatPassword: { required, sameaspass: sameAs(this.formRegister.password) },
      },
    };
  },
};
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
</style>
