<template>
  <main class="container">
    <router-view v-slot="{ Component, route }">
      <transition enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
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

.animate__animated {
  --animate-duration: 0.5s;
  animation-timing-function: ease-in-out;
}

body {
  background-color: var(--dark-900-color);
  font-family: var(--font-family);
  font-weight: normal;
  font-size: var(--medium-font-size);
  color: var(--secondary-200-color);
  /* Prevent scrollbar from appearing */
}
</style>