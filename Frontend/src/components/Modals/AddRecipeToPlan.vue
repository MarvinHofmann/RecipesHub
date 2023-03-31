<template>
  <!-- Modal -->
  <div class="modal fade" id="addToDate" tabindex="-1" aria-labelledby="addToDateModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addToDateModalLabel">
            Neues Rezept am <b>{{ this.date }}</b>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Welches Rezept wollen Sie hinzufügen?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal" @click="this.onAddRecipeToDate()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["date"],
  data() {
    return {
      recipes: [],
    };
  },
  methods: {},
  async mounted() {},
};
</script>

<style scoped></style>
