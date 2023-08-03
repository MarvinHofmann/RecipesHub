<template>
  <!-- Modal -->
  <div ref="addCategory" class="modal fade" id="addCategory" tabindex="-1" aria-labelledby="addCatLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addCatLabel">Kategorie hinzufügen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="tagData">
            <div class="row">
              <div class="accordion" id="tagAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Deine Kategorien
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#tagAccordion">
                    <div class="accordion-body">
                      <div class="row" id="collapseTags">
                        <div class="col-4 p-y-0" v-for="cat in categories">
                          <p class="mb-1 text-muted">{{ cat }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-lg-12">
                <label for="catName" class="form-label">Name<d class="text-danger">*</d></label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="this.categoryData.name" id="catName" :class="{ 'is-invalid': v$.categoryData.name.$error }" />
                </div>
                <!-- error message -->
                <div class="text-danger" v-if="v$.categoryData.name.$error">Dieser Name ist nicht möglich</div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="this.refreshedOnce = false">Schließen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onAddCategory()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { addCategory, getCategories } from "../../api/userdataHandling";
import { Modal } from "bootstrap";
export default {
  name: "AddCategory",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      categoryData: {
        name: null,
      },
      categories: [],
      bsModal: null,
    };
  },
  methods: {
    notInCategories(value) {
      return !this.categories.includes(value);
    },
    async onAddCategory() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      let res = await addCategory(this.categoryData.name, this.categoryData.color);
      if (res.error) {
        this.categories = await getCategories();
        return;
      }
      this.v$.$reset();
      this.categoryData.name = null;
      this.categories = await getCategories();
      this.bsModal.hide();
    },

    setListener(myModal) {
      myModal._element.addEventListener("shown.bs.modal", async (event) => {
        this.categories = await getCategories();
      });
    },
  },
  validations() {
    return {
      categoryData: {
        name: { required, notInCategories: this.notInCategories },
      },
    };
  },
  async mounted() {
    this.categories = await getCategories();
    const modal = new Modal(document.getElementById("addCategory"));
    this.setListener(modal);
    this.bsModal = modal;
  },
};
</script>

<style scoped></style>
