<template>
  <footer class="text-center text-lg-start bg-light text-muted">
    <section class="d-flex justify-content-center justify-content-lg-between p-0 border-bottom"></section>
    <section class="footer">
      <div class="container text-center text-md-start mt-3">
        <div class="row mt-2">
          <div class="col-md-2 col-lg-3 col-xl-2 mx-auto">
            <h6 class="text-uppercase fw-bold mb-3">RecipesHub</h6>
            <p>
              <img src="../assets/logo.png" width="80" />
            </p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
            <h6 class="text-uppercase fw-bold mb-3">Gebaut mit</h6>
            <p>
              <a href="https://vuejs.org/" class="text-reset">Vue.js</a>
            </p>
            <p>
              <a href="https://nodejs.org/en/" class="text-reset">Node.js</a>
            </p>
            <p>
              <a href="https://www.mongodb.com/" class="text-reset">MongoDB</a>
            </p>
          </div>

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
            <h6 class="text-uppercase fw-bold mb-3">Kontakt</h6>

            <p><i class="bi bi-envelope-at"></i>recipeshub@gmx.de</p>
            <p>
              <i class="bi bi-laptop"></i>
              <a href="https://recipeshub.de" class="text-reset">recipeshub.de</a>
            </p>
            <p>
              <i class="bi bi-github"></i>
              <a href="https://GitHub.com/MarvinHofmann" class="text-reset">GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2023 Copyright:
      <a class="text-reset fw-bold" href="https://recipeshub.de">recipeshub.de</a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.bi {
  margin-right: 5px;
}
.footer {
  color: #212529;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
