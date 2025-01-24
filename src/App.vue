<template>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "./assets/css/variables.scss";
@import "./assets/css/animations.scss";

@media (max-width: 1300px) {
  main.container {
    margin: 0 1rem;
  }
}

body {
  background-color: var(--dark-900-color);
  font-family: var(--font-family);
  font-weight: normal;
  font-size: var(--medium-font-size);
  color: var(--secondary-200-color);
}
</style>
