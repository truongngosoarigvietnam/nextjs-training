    <template>
    <div class="bg-[#F1FCF2] px-[3%] h-[100vh]">
        <div class="flex gap-x-[1%]">
            <div class="w-[48%]  h-[100vh] text-center ">
                <tableSpecialVue />
            </div>
            <div class="w-[48%]  h-[100vh] text-center ">
                <tableDoctor />
            </div>
         
        </div>
    </div>
</template>

<script>
import tableDoctor from './tableDoctor.vue';
import tableSpecialVue from './tableSpecial.vue';
export default {
    setup() {
        
    },
    components: {
        tableDoctor,
        tableSpecialVue
    }



};
</script>

<style></style>
