<template>
    <Header />
    <slot />
</template>

<script>
import Header from '@/views/Header/Header.vue';

export default {
    setup() {
        return {

        };
    },
    components: {
        Header
    },
};
</script>

<style></style>
