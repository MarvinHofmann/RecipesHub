<template>
  <!-- Modal -->
  <div class="modal fade" id="addTag" tabindex="-1" aria-labelledby="addTagModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTagModalLabel">Tag Hinzufügen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="tagData">
            <div class="row">
              <div class="col-lg-12">
                <label for="name" class="form-label">Name</label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="this.tagData.name" id="name" :class="{ 'is-invalid': v$.tagData.name.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.tagData.name.$error">Dieser Tag Name ist nicht möglich</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onAddTag()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/auth.store";
import { addTag } from "../../api/userdataHandling";
export default {
  setup() {
    return { v$: useVuelidate(), userStore: useAuthStore() };
  },
  data() {
    return {
      tagData: {
        name: null,
      },
    };
  },
  methods: {
    notInTags(value) {
      return !this.userStore.user.tags.includes(value);
    },
    async onAddTag() {
      console.log(this.tagData);
      this.v$.$touch();
      if (this.v$.$invalid) return;
      let res = await addTag(this.tagData.name);
      if (res.error) {
        console.log("Fehler beim hinzufügen der Kategorie");
      }
      this.v$.$reset();
      this.tagData.name = null;
    },
  },
  validations() {
    return {
      tagData: {
        name: { required, notInTags: this.notInTags },
      },
    };
  },
};
</script>

<style scoped></style>
