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
    <div class="offcanvas-body">
      <div class="row">
        <div class="col-6 d-flex justify-content-center">
          <img src="../assets/vue.svg" alt="avatar" width="130" height="130" class="rounded-circle bg-success p-0" />
        </div>
        <div class="col-6">
          <div>Marvin Hofmann</div>
          <div>Mitglied seit: 1.1.1889</div>
          <div>E-Mail: marvin@raithweg15.de</div>
          <button class="btn btn-outline-dark mt-2" @click="this.edit_data = !this.edit_data">
            <div v-if="!this.edit_data">Daten Ändern</div>
            <div v-else>Abbrechen</div>
          </button>
        </div>
      </div>
      <Transition name="fade">
        <form v-if="this.edit_data" ref="changeData">
          <hr class="mb-2" />
          <div class="mb-3">
            <!-- Row Vorname / Nachname -->
            <div class="row">
              <div class="col-lg-6">
                <label for="name" class="form-label">Vorname</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="v$.userdata.vorname.$model"
                    id="name"
                    :class="{ 'is-invalid': v$.userdata.vorname.$error }"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.userdata.vorname.$error">Vorname Benötigt</div>
              </div>
              <div class="col-lg-6">
                <label for="nachname" class="form-label">Nachname</label>
                <div class="input-group">
                  <input
                    :class="{ 'is-invalid': v$.userdata.nachname.$error }"
                    v-model="v$.userdata.nachname.$model"
                    type="text"
                    class="form-control"
                    id="nachname"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.userdata.nachname.$error">Nachname Benötigt</div>
              </div>
            </div>

            <!-- Row Email / Username -->
            <div class="row mt-3">
              <div class="col-lg-6">
                <label for="email" class="form-label">Email</label>
                <div class="input-group">
                  <input
                    :class="{ 'is-invalid': v$.userdata.email.$error }"
                    v-model="this.userdata.email"
                    type="text"
                    class="form-control"
                    id="email"
                    @blur="v$.userdata.email.$touch"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.userdata.email.$error">Email Benötigt</div>
              </div>
              <div class="col-lg-6">
                <label for="username" class="form-label">Username</label>
                <div class="input-group">
                  <input
                    v-model="this.userdata.username"
                    @blur="v$.userdata.username.$touch"
                    type="text"
                    class="form-control"
                    id="username"
                    :class="{ 'is-invalid': v$.userdata.username.$error }"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.userdata.username.$error">Username Benötigt</div>
              </div>
            </div>
          </div>
        </form>
      </Transition>
      <Transition name="fade">
        <div v-if="this.edit_data">
          <button :disabled="v$.userdata.$invalid" class="btn btn-outline-dark mt-1 w-100" @click="this.onSaveSettings()">Speichern</button>
          <hr />
        </div>
      </Transition>
      <button
        :disabled="this.edit_data"
        data-bs-toggle="modal"
        data-bs-target="#deleteAccountModal"
        class="stickBottom btn btn-outline-danger mb-3 mx-3"
      >
        Account löschen
      </button>
    </div>
  </div>
  <DeleteAccount id="deleteAccountModal" @delete="this.onDeleteAccount()"></DeleteAccount>
  <SaveModal id="saveModal" @closeSettings="this.emitCloseSettings()"></SaveModal>
</template>

<script>
import SaveModal from "./Modals/SaveModal.vue";
import DeleteAccount from "./Modals/DeleteAccount.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { Offcanvas, Modal } from "bootstrap";
export default {
  components: {
    DeleteAccount,
    SaveModal,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      bsOffcanvas: null,
      bsModal: null,
      edit_data: false,
      userdata: {
        vorname: null,
        nachname: null,
        email: null,
        username: null,
      },
    };
  },
  validations() {
    return {
      userdata: {
        vorname: { required },
        nachname: { required },
        email: { required, email },
        username: { required },
      },
    };
  },
  methods: {
    /**
     * If the user saves his changes diable edit mode and store changes
     */
    onSaveSettings() {
      this.edit_data = false;
      // Change data at Backend
    },
    /**
     * Gets called if the user surely deletes it after pressing
     * Löschen in the Modal
     */
    onDeleteAccount() {
      //Delete Account from Backend
      console.log("DELETE Account");
    },
    closeSettings() {
      if (!this.edit_data || JSON.stringify(this.userdata) == JSON.stringify(this.getInitialUserdata())) {
        this.edit_data = false;
        this.bsOffcanvas.hide();
        return;
      }
      this.bsModal.show();
    },
    emitCloseSettings() {
      this.$refs.changeData.reset();
      this.edit_data = false;
      this.bsOffcanvas.hide();
      this.userdata = this.getInitialUserdata();
      console.log(this.userdata);
      this.v$.$reset();
    },
    getInitialUserdata() {
      return { vorname: null, nachname: null, email: null, username: null };
    },
    setupOffcanvasListener(myOffcanvas) {
      myOffcanvas.addEventListener("hidePrevented.bs.offcanvas", (event) => {
        this.closeSettings();
      });
    },
  },
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
</style>
