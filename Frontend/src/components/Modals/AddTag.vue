<template>
  <!-- Modal -->
  <div class="modal fade" id="addTag" tabindex="-1" aria-labelledby="addTagModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTagModalLabel">Tag hinzufügen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="tagData">
            <div class="row">
              <div class="accordion" id="tagAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Deine Tags
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#tagAccordion">
                    <div class="accordion-body">
                      <div class="row" id="collapseTags">
                        <div class="col-sm-3 p-y-0" v-for="tag in tags">
                          <p class="p-0 mb-1 text-muted">{{ tag }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-12">
                <label for="tagName" class="form-label">Name<d class="text-danger">*</d></label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="this.tagData.name"
                    id="tagName"
                    :class="{ 'is-invalid': v$.tagData.name.$error }"
                  />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.tagData.name.$error">Dieser Tag Name ist nicht möglich</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onAddTag()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { addTag, getTags } from "../../api/userdataHandling";
export default {
  name: "AddTag",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      tagData: {
        name: null,
      },
      tags: [],
    };
  },
  methods: {
    notInTags(value) {
      return !this.tags.includes(value);
    },
    async onAddTag() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      let res = await addTag(this.tagData.name);
      if (res.error) {
        console.log("Fehler beim hinzufügen der Kategorie");
      }
      this.tags = await getTags();
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
  async mounted() {
    this.tags = await getTags();
    setInterval(async () => {
      this.tags = await getTags();
    }, 10000);
  },
};
</script>

<style scoped></style>
