<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteCategory" tabindex="-1" aria-labelledby="deleteCateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteCateModalLabel">Kategorie löschen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="row" id="collapseTags">
              <div class="col-4 p-y-0" v-for="cat in categories">
                <p class="mb-1 text-muted">{{ cat.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onDeleteCategory()">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCategories } from "../../api/userdataHandling";
export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async onDeleteCategory() {},
  },
  async mounted() {
    this.categories = await getCategories();
  },
};
</script>

<style scoped></style>
