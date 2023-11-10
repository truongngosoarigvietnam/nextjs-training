<template>
  <Banner />
  <Specialty />
  <MedicialFacility />
  <OutStandingDoctor />
  <Handbook/>
</template>

<script>
import Banner from "./Home/Banner.vue"
import Specialty from "./Home/Specialty.vue"
import MedicialFacility from "./Home/MedicialFacility.vue";
import OutStandingDoctor from "./Home/OutStandingDoctor.vue";
import Handbook from "./Home/Handbook.vue";
export default {
  name: 'banner',
  setup() {
    
  },
  components: {
    Banner,
    Specialty,
    MedicialFacility,
    OutStandingDoctor,
    Handbook
  }

}
</script>

<style>

</style>