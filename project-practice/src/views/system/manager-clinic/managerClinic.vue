<template>
    <div class="bg-[#F1FCF2] px-[3%] h-[100vh]">
        <div class="flex gap-x-[1%]">
            <div class="w-[48%]  h-[100vh] text-center ">
            <tableClinic />
            </div>
            <div class="w-[48%]  h-[100vh] text-center ">
            <tableDoctorClinic />
            </div>
         
        </div>
    </div>
</template>

<script>
import tableClinic from './tableClinic.vue';
import tableDoctorClinic from './tableDoctorClinic.vue';
export default {
    setup() {

        return {

        }
    },
    components: {
        tableClinic,
        tableDoctorClinic
        }
}
</script>

<style>

</style>