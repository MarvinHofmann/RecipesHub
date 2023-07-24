<template>
    <!-- Modal -->
    <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="saveModalModalLabel">Es gibt ungespeicherte Änderungen. Wollen Sie
                        wirklich beenden?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Nein</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="this.$emit('closeSettings')">Ja</button>
                </div>
            </div>
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

<style scoped></style>
