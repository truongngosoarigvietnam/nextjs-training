<template>
    <Menu />
    <slot />
</template>

<script>
import Menu from './Menu/Menu.vue';
export default {
    components: {
        Menu
    }
}
</script>

<style>

</style>