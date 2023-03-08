<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasSettings" aria-labelledby="offcanvasSettingsLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasSettingsLabel">Einstellungen</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="row px-5">
        <div class="col-6 d-flex justify-content-center">
          <img src="../assets/vue.svg" alt="avatar" width="130" height="130" class="rounded-circle bg-success p-0" />
        </div>
        <div class="col-6 mt-3">
          <div>Marvin Hofmann <span class="text-muted">(21)</span></div>
          <div>
            Mitglied seit:
            <div class="float-end">1.1.1889</div>
          </div>
          <button class="btn btn-outline-dark mt-2 w-100">Daten ändern</button>
        </div>
      </div>
      <hr />
      <button class="stickBottom btn btn-outline-danger mb-3 mx-3">Account löschen</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.offcanvas {
  width: 600px !important;
}

.stickBottom{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
