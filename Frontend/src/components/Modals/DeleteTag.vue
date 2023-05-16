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
          <div class="row">
            <input class="form-control" v-model="searchTerm" type="search" placeholder="Suche in deinen Tags..." />
            <form class="mt-1">
              <div class="form-check form-check-inline mb-2" v-for="(tag, index) in filteredData">
                <input class="form-check-input" type="checkbox" :value="tag" :id="tag + index" />
                <label class="form-check-label" :for="tag + index"> {{ tag }} </label>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" @click="this.onDeleteTag()">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTags } from "../../api/userdataHandling";
export default {
  data() {
    return {
      tags: [],
      searchTerm: "",
    };
  },
  computed: {
    filteredData() {
      return this.tags.filter((entry) => {
        return entry.toLowerCase().includes(this.searchTerm);
      });
    },
  },
  methods: {
    async onDeleteTag() {},
  },
  async mounted() {
    this.tags = await getTags();
  },
};
</script>

<style scoped></style>
