<template>
    <section class="container">
        <slot></slot>
    </section>
</template>
<script>

export default {
    name: "MainContainerComponent",
}
</script>
<style lang="scss" scoped>
.container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100svh - 146px);
}
</style>