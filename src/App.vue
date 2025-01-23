<template>
  <main class="container border">
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

body {
  background-color: var(--dark-900-color);
  font-family: var(--font-family);
  font-weight: normal;
  font-size: var(--medium-font-size);
  color: var(--secondary-200-color);
}

@media screen and (max-width: 1300px) {
  .border {
    margin: 0 1rem;
  }
}
</style>
