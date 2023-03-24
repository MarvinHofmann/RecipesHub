<template>
  <!-- Modal -->
  <div class="modal fade" id="addTag" tabindex="-1" aria-labelledby="addTagModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTagModalLabel">Kategorie Hinzufügen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="tagData">
            <div class="row mt-3">
              <div class="col-lg-12">
                <label for="name" class="form-label">Name</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="this.categoryData.name"
                    id="name"
                    :class="{ 'is-invalid': v$.categoryData.name.$error }"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.categoryData.name.$error">Dieser Name ist nicht möglich</div>
              </div>

              <div class="col-lg-12">
                <label for="color" class="form-label">Farbe</label>
                <div class="input-group">
                  <input class="form-control" type="color" v-model="this.categoryData.color" id="color" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onAddCategory">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/auth.store";
import { addCategory } from "../../api/userdataHandling";
export default {
  setup() {
    return { v$: useVuelidate(), userStore: useAuthStore() };
  },
  data() {
    return {
      categoryData: {
        name: null,
        color: "#1cb1e3",
      },
    };
  },
  methods: {
    notInCategories(value) {
      return !this.userStore.user.categories.includes(value);
    },
    async onAddCategory() {
      console.log(this.categoryData);
      this.v$.$touch();
      if (this.v$.$invalid) return;
      let res = await addCategory(this.categoryData.name, this.categoryData.color);
      if (res.error) {
        console.log("Fehler beim hinzufügen der Kategorie");
      }
      this.v$.$reset();
      this.categoryData.name = null;
    },
  },
  validations() {
    return {
      categoryData: {
        name: { required, notInCategories: this.notInCategories },
      },
    };
  },
};
</script>

<style scoped></style>
