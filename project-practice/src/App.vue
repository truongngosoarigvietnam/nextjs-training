
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>


<script>
import {computed} from "vue"
import { useRoute } from "vue-router";
import { PUBLIC_LAYOUT} from "@/constants"
export default {
  setup() {

    const route = useRoute()
    console.log(route);
      
    return {
      layout : computed(()=> (route.meta.layout || PUBLIC_LAYOUT) + "-layout")
    }
  }

  }
 
</script>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
