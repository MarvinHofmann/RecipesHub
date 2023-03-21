<template>
  <div class="col-xxl-3 col-lg-4 col-md-6 mb-4">
    <div class="card h-100" @click="this.onClickRecipe">
      <img class="card-img-top" :src="this.image" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ this.recipeName }}</h5>
        <p class="card-text mb-1">{{ this.category }}</p>
        <template v-for="item in this.tags">
          <span class="badge rounded-pill text-bg-secondary">{{ item }}</span>
        </template>
      </div>
      <div class="card-footer bg-white border border-0 pt-0">
        <p class="text-muted float-end mb-0">{{ this.duration }} min</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipeName: {
      type: String,
      default: "Rezept Name Default",
    },
    tags: {
      type: Array,
      default: ["Tag1", "Tag2", "Tag3"],
    },
    duration: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "http://via.placeholder.com/640x360",
    },
    category: {
      type: String,
      default: "Kategorie",
    },
    recipeID: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickRecipe() {
      this.$router.push("/rezept/" + this.recipeID);
    },
  },
};
</script>

<style scoped>
.badge {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33,33,33,.2);
}
.card-img-top {
  width: 100%;
  height: 20vh;
  object-fit: cover;
}
</style>
