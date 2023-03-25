<template>
  <!-- Modal -->
  <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteAccountModalLabel">{{ this.deleteText }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="this.$emit('delete')">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deleteText"],
  data() {
    return {};
  },
};
</script>

<style scoped></style>
