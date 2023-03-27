<template>
  <div
    ref="offcanvas"
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasSettings"
    aria-labelledby="offcanvasSettingsLabel"
    data-bs-backdrop="static"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasSettingsLabel">Einstellungen</h5>
      <button type="button" class="btn-close text-reset" @click="this.closeSettings()" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body pt-0">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Profil
          </button>
          <button
            class="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Daten ändern
          </button>
          <button
            class="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Passwort ändern
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active mt-4" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div class="row">
            <div class="col-6 d-flex justify-content-center">
              <img src="../assets/vue.svg" alt="avatar" width="130" height="130" class="rounded-circle bg-success p-0 profilePic" />
            </div>
            <div class="col-6">
              <div>{{ this.userStore.user.firstName }} {{ this.userStore.user.lastName }}</div>
              <div>Mitglied seit: {{ this.userStore.user.registrationDate }}</div>
              <div>E-Mail: {{ this.userStore.user.email }}</div>
            </div>
          </div>
          <div class="stickBottom mb-3 mx-3">
            <button data-bs-toggle="modal" data-bs-target="#deleteAccountModal" class="w-100 btn btn-outline-danger">Account löschen</button>
          </div>
        </div>
        <div class="tab-pane fade mt-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form ref="changeData">
            <h3>Userdaten ändern</h3>
            <div class="mb-3">
              <!-- Row Vorname -->
              <div class="row mt-2">
                <div class="col-lg-12">
                  <label for="firstName" class="form-label">Vorname</label>
                  <div class="input-group">
                    <input class="form-control" aria-describedby="bFirstName" type="text" v-model="v$.userdata.firstName.$model" id="firstName" />
                    <button
                      @click="onChangeUserdata('firstName')"
                      :disabled="v$.userdata.firstName.$error || this.userdata.firstName == null"
                      class="btn btn-outline-success"
                      type="button"
                      id="bFirstName"
                    >
                      Ändern
                    </button>
                  </div>
                </div>
              </div>
              <!-- Row Nachname -->
              <div class="row mt-2">
                <div class="col-lg-12">
                  <label for="nachname" class="form-label">Nachname</label>
                  <div class="input-group">
                    <input v-model="v$.userdata.lastName.$model" type="text" class="form-control" id="nachname" />
                    <button
                      @click="onChangeUserdata('lastName')"
                      :disabled="v$.userdata.lastName.$error || this.userdata.lastName == null"
                      class="btn btn-outline-success"
                      type="button"
                      id="blastName"
                    >
                      Ändern
                    </button>
                  </div>
                </div>
              </div>

              <!-- Row Email -->
              <div class="row mt-2">
                <div class="col-lg-12">
                  <label for="email" class="form-label">Email</label>
                  <div class="input-group">
                    <input
                      :class="{ 'is-invalid': v$.userdata.email.$error }"
                      v-model="v$.userdata.email.$model"
                      type="text"
                      class="form-control"
                      id="email"
                    />
                    <button
                      @click="onChangeUserdata('email')"
                      :disabled="v$.userdata.email.$error || this.userdata.email == null"
                      class="btn btn-outline-success"
                      type="button"
                      id="bEmail"
                    >
                      Ändern
                    </button>
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.email.$error">Keine gültige Email Adresse</div>
                </div>
              </div>

              <!-- Row Username -->
              <div class="row mt-2">
                <div class="col-lg-12">
                  <label for="username" class="form-label">Username</label>
                  <div class="input-group">
                    <input v-model="v$.userdata.username.$model" type="text" class="form-control" id="username" />
                    <button
                      @click="onChangeUserdata('username')"
                      :disabled="v$.userdata.username.$error || this.userdata.username == null"
                      class="btn btn-outline-success"
                      type="button"
                      id="bUsername"
                    >
                      Ändern
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Alert ref="userDataAlert" :message="this.userDataAlert.message" :type="this.userDataAlert.type"></Alert>
          </form>
        </div>
        <div class="tab-pane fade mt-3" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <form ref="pwChangeForm">
            <!--Current Password-->
            <h3>Neues Passwort</h3>
            <Alert ref="pwAlert" :type="this.alertMessageType" :message="this.alertMessage"></Alert>
            <div class="mb-3">
              <div class="row">
                <div class="col-lg-12">
                  <label for="oldPassword" class="form-label">Aktuelles Passwort</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="password"
                      v-model="this.passwordChange.currentPassword"
                      id="oldPassword"
                      :class="{ 'is-invalid': v$.passwordChange.currentPassword.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.passwordChange.currentPassword.$error">Neues Passwort eingeben</div>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <!-- New Password / Repeat -->
              <div class="row">
                <div class="col-lg-6">
                  <label for="newPassword" class="form-label">Neues Passwort</label>
                  <div class="input-group">
                    <input
                      class="form-control"
                      type="password"
                      v-model="this.passwordChange.newPassword"
                      id="newPassword"
                      :class="{ 'is-invalid': v$.passwordChange.newPassword.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.passwordChange.newPassword.$error">Passwörter stimmen nicht überein</div>
                </div>
                <div class="col-lg-6">
                  <label for="rePassword" class="form-label">Passwort wiederholen</label>
                  <div class="input-group">
                    <input
                      :class="{ 'is-invalid': v$.passwordChange.repeatPassword.$error }"
                      v-model="this.passwordChange.repeatPassword"
                      type="password"
                      class="form-control"
                      id="rePassword"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.passwordChange.repeatPassword.$error">Passwörter stimmen nicht überein</div>
                </div>
              </div>
            </div>
            <div>
              <button type="button" class="btn btn-outline-dark mt-1 w-100" @click="this.onChangePassword()">Passwort ändern</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <DeleteAccount id="deleteAccountModal" :deleteText="'Wollen Sie den Account wirklich löschen?'" @delete="this.onDeleteAccount()"></DeleteAccount>
  <SaveModal id="saveModal" @closeSettings="this.emitCloseSettings()"></SaveModal>
</template>

<script>
import SaveModal from "./Modals/SaveModal.vue";
import DeleteAccount from "./Modals/SureDelete.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { Offcanvas, Modal } from "bootstrap";
import { deleteUser, changePassword } from "../api/userHandling";
import { changeEmail, changeFirstName, changeLastname, changeUsername } from "../api/userdataHandling";
import { useAuthStore } from "../stores/auth.store";
import Alert from "./Alert.vue";
export default {
  components: {
    DeleteAccount,
    SaveModal,
    Alert,
  },
  setup() {
    return { v$: useVuelidate(), userStore: useAuthStore() };
  },
  data() {
    return {
      bsOffcanvas: null,
      bsModal: null,
      userdata: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
      },
      passwordChange: {
        currentPassword: null,
        newPassword: null,
        repeatPassword: null,
      },
      alertMessage: null,
      alertMessageType: null,
      userDataAlert: {
        message: null,
        type: null,
      },
    };
  },
  validations() {
    return {
      userdata: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        username: { required },
      },
      passwordChange: {
        currentPassword: { required },
        newPassword: { required, minLengthValue: minLength(6) },
        repeatPassword: { required, sameaspass: sameAs(this.passwordChange.newPassword) },
      },
    };
  },
  methods: {
    /**
     * Gets called if the user surely deletes it after pressing
     * Löschen in the Modal
     */
    async onDeleteAccount() {
      //Delete Account from Backend
      let serverResponse = await deleteUser();
      if (serverResponse.error) {
        console.log(error);
      } else {
        this.bsOffcanvas.hide();
        this.userStore.deleteUser();
        this.$router.push("/login");
      }
    },
    /**
     * Gets called on change button Press in userdata settings
     * fires the request to the backend
     * @param {*} field name of the value that gets changed
     */
    async onChangeUserdata(field) {
      let res = null;
      switch (field) {
        case "firstName":
          res = await changeFirstName(this.userdata.firstName);
          break;
        case "lastName":
          res = await changeLastname(this.userdata.lastName);
          break;
        case "email":
          res = await changeEmail(this.userdata.email);
          break;
        case "username":
          res = await changeUsername(this.userdata.username);
          break;
      }
      if (res.error) {
        this.userDataAlert = { message: res.error, type: "alert-danger" };
      }else{
        this.userDataAlert = { message: "Daten erfolgreich geändert", type: "alert-success" };
      }
      this.v$.$reset();
      this.$refs.changeData.reset()
      this.userdata = this.getInitialUserdata()
      this.$refs.userDataAlert.showAlert();
    },
    /**
     * Post new Password to the backend cheks if its ok
     * shows information if pw changed or an Error occured
     */
    async onChangePassword() {
      this.v$.$touch();
      if (this.v$.passwordChange.$invalid) return;

      let res = await changePassword(this.passwordChange.currentPassword, this.passwordChange.newPassword);
      if (res.error) {
        this.alertMessage = "Fehler beim Ändern des Passworts.";
        this.alertMessageType = "alert-danger";
        this.$refs.pwAlert.showAlert();
        return;
      }
      this.alertMessage = "Das Passwort wurde erfolgreich geändert.";
      this.alertMessageType = "alert-success";
      this.$refs.pwChangeForm.reset();
      this.$refs.pwAlert.showAlert();
      this.passwordChange = this.getInitialPasswordData();
      this.v$.$reset();
    },
    /**
     * If userdata isnt in edit mode or nothing changed the offcanvas settings
     * gets closed. Otherwise a Modal is shown that there are unsaved changes
     */
    closeSettings() {
      if (
        JSON.stringify(this.passwordChange) == JSON.stringify(this.getInitialPasswordData()) &&
        JSON.stringify(this.userdata) == JSON.stringify(this.getInitialUserdata())
      ) {
        this.bsOffcanvas.hide();
        return;
      }
      this.bsModal.show();
    },
    /**
     * If the modal fires the event, that the user surely wants to leave the settings
     * with loosing its changes
     */
    emitCloseSettings() {
      this.$refs.changeData.reset();
      this.$refs.pwChangeForm.reset();
      this.bsOffcanvas.hide();
      this.userdata = this.getInitialUserdata();
      this.changeData = this.getInitialPasswordData();
      this.v$.$reset();
    },
    /**
     * Stores and returns the initial userdata in a json
     */
    getInitialUserdata() {
      return { firstName: null, lastName: null, email: null, username: null };
    },
    /**
     * Stores and returns the initial password form data in a json
     */
    getInitialPasswordData() {
      return { currentPassword: null, newPassword: null, repeatPassword: null };
    },
    /**
     * Initializes the eventlistener for the Offcanvas. It checks if the user
     * wants to close the offcanvas with a click next to the canvas
     */
    setupOffcanvasListener(myOffcanvas) {
      myOffcanvas.addEventListener("hidePrevented.bs.offcanvas", (event) => {
        this.closeSettings();
      });
    },
  },
  /**
   * While Settings get mounted in vue LifeCycle init the Modal and the
   * offcanvas
   */
  mounted() {
    this.bsOffcanvas = new Offcanvas(this.$refs.offcanvas);
    const myOffcanvas = document.getElementById("offcanvasSettings");
    this.setupOffcanvasListener(myOffcanvas);
    const saveModal = document.getElementById("saveModal");
    const modal = new Modal(saveModal);
    this.bsModal = modal;
  },
};
</script>

<style scoped>
.offcanvas {
  width: 650px !important;
}

.stickBottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.profilePic:hover {
  opacity: 0.5;
}
</style>
