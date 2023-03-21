<template>
  <Navbar></Navbar>
  <div class="container">
    <h1 class="display-3 mt-5 text-center">Recipe {{ $route.params.id }}</h1>
    <pre class="overflow-scroll font-monospace fs-5" style="max-height: 500px;">{{ this.recipeData }}</pre>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { getRecipeWithID } from "../api/recipeHandling";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      recipeData: null,
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    let res = await getRecipeWithID(this.$route.params.id);
    if (res.error){
      this.$router.push("/404");
      return;
    }
    this.recipeData = res.data;
  },
};
</script>

<style scoped></style>
