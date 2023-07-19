<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteCat" tabindex="-1" aria-labelledby="deleteCatModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteCatModalLabel">Kategorie löschen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input class="form-control" v-model="this.searchTerm" type="search" placeholder="Suche in deinen Kategorien..." />
          <div class="maxHeight row mx-1">
            <div class="col-4 mt-2" v-for="(category, index) in filteredData">
              <span type="button" class="badge rounded-pill text-bg-danger me-2" @click="addToDelete(category, index)"><i class="bi bi-trash"></i></span>
              <label class="form-check-label" :for="category + index"> {{ category }} </label>
            </div>
          </div>
          <div class="mt-2 me-1 btn-group" v-for="(selectedItem, index) in this.selectedItems" @click="removeSelected(selectedItem, index)">
            <button type="button" class="btn btn-sm btn-outline-dark">{{ selectedItem }} <i class="bi bi-x-circle"></i></button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" :disabled="this.selectedItems.length == 0"  @click="this.onDeleteCategory()">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteCategory, getCategories } from "../../api/userdataHandling";
export default {
  data() {
    return {
      categories: [],
      searchTerm: "",
      selectedItems: [],
    };
  },
  computed: {
    filteredData() {
      return this.categories.filter((entry) => {
        return entry.toLowerCase().includes(this.searchTerm.toLocaleLowerCase());
      });
    },
  },
  methods: {
    async onDeleteCategory() {
      this.selectedItems.forEach(element => {
        deleteCategory(element)
      });
      this.selectedItems = []
    },
    addToDelete(category) {
      // individually search index, because filteredData could return a shorter list
      // with a wrong index in terms of the whole array
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i] == category) {
          this.selectedItems.push(category);
          this.terms.splice(i, 1);
          return;
        }
      }
    },
    removeSelected(selected, index) {
      this.terms.push(selected);
      this.selectedItems.splice(index, 1);
    },
  },
  async mounted() {
    this.categories = await getCategories();
  },
};
</script>

<style scoped>
.maxHeight {
  max-height: 250px;
  overflow-y: auto;
}
</style>
