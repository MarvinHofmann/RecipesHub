<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteTag" tabindex="-1" aria-labelledby="deleteTagModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteTagModalLabel">Tag löschen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input class="form-control" v-model="searchTerm" type="search" placeholder="Suche in deinen Tags..." />
          <div class="maxHeight row mx-1">
            <div class="col-4 mt-2" v-for="(tag, index) in filteredData">
              <span type="button" class="badge rounded-pill text-bg-danger me-2" @click="addToDelete(tag, index)"><i class="bi bi-trash"></i></span>
              <label class="form-check-label" :for="tag + index"> {{ tag }} </label>
            </div>
          </div>
          <div class="mt-2 me-1 btn-group" v-for="(selectedItem, index) in this.selectedItems" @click="removeSelected(selectedItem, index)">
            <button type="button" class="btn btn-sm btn-outline-dark">{{ selectedItem }} <i class="bi bi-x-circle"></i></button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" class="btn btn-outline-dark" :disabled="this.selectedItems.length == 0"  @click="this.onDeleteTag()">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteTag, getTags } from "../../api/userdataHandling";
export default {
  name: "DeleteTag",
  data() {
    return {
      tags: [],
      searchTerm: "",
      selectedItems: [],
    };
  },
  computed: {
    filteredData() {
      return this.tags.filter((entry) => {
        return entry.toLowerCase().includes(this.searchTerm.toLocaleLowerCase());
      });
    },
  },
  methods: {
    async onDeleteTag() {
      this.selectedItems.forEach(element => {
          deleteTag(element)
      });
      this.selectedItems = []
    },
    addToDelete(tag) {
      // individually search index, because filteredData could return a shorter list
      // with a wrong index in terms of the whole array
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == tag) {
          this.selectedItems.push(tag);
          this.tags.splice(i, 1);
          return;
        }
      }
    },
    removeSelected(selected, index) {
      this.tags.push(selected);
      this.selectedItems.splice(index, 1);
    },
  },
  async mounted() {
    this.tags = await getTags();
    setInterval(async () => {
      this.tags = await getTags();
    }, 10000);
  },
};
</script>

<style scoped>
.maxHeight {
  max-height: 250px;
  overflow-y: auto;
}
</style>
