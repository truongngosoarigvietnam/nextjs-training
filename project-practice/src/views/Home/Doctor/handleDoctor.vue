<template>
    <div class="h-[70px]">
        <div class="flex items-center shadow-lg h-full gap-x-2 px-[5%]">
            <font-awesome-icon :icon="['fass', 'arrow-left']" class="text-2xl cursor-pointer" />
            <p class="text-2xl">Bác sĩ</p>
        </div>
    </div>
    <div class="bg-[#F5F5F5] px-[2%] h-[70px] flex items-center">
        <input
        placeholder="Tìm kiếm bác sĩ nổi bật"
        :value="keySearch"
        @input="(event) => (keySearch = event.target.value)"

            type="text"
            id="small-input"
            class="focus-visible:outline-none focus:outline-none text-lg block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
    <div v-if="listData.length > 0 " class="px-[5%] font-bold">
        <h4>Kết quả tìm kiếm</h4>
        <router-link :to="`/doctor/${item.id}`" class="border-b-[1px] border-gray-200 cursor-pointer" v-for="item in listData" :key="item.id">
            <div class="flex gap-x-4 my-4 ">
                <img class="w-[50px] h-[50px] rounded-[50%]" :src="item.image" />
                <div>
                    <div class="font-normal"> {{ item.positionData.valueVi }} chuyên khoa  || {{ item.lastName }} {{ item.firstName }}</div>
                    <div class="font-light">Sức khỏe tâm thần </div>
                     </div>
                 </div>

             </router-link>
    </div>
    <div class="px-[5%] font-bold">
        <h4>Bác sĩ nổi bật</h4>
        <router-link :to="`/doctor/${item.id}`" class="border-b-[1px] border-gray-200 cursor-pointer" v-for="item in dataDoctor" :key="item.id">
            <div class="flex gap-x-4 my-4 ">
                <img class="w-[50px] h-[50px] rounded-[50%]" :src="item.image" />
                <div>
                    <div class="font-normal"> {{ item.positionData.valueVi }} chuyên khoa  || {{ item.lastName }} {{ item.firstName }}</div>
                    <div class="font-light">Sức khỏe tâm thần </div>
                     </div>
                 </div>

             </router-link>
    </div>
</template>

<script>
import useDoctor from "@/services/apiTopDoctor"
import useDoctorSearch from "@/services/apiListUser"
import { ref , watch } from "vue"
import debounce from 'lodash.debounce';

export default {
    setup() {
        const { dataDoctor, errorData, getTopdoctor } = useDoctor()
        const { fetchListUser , listData } = useDoctorSearch()
        const keySearch = ref('')

       
        watch(
            keySearch,
            debounce((pa, pb) => {
                console.log('check');
                fetchListUser({q : pa , type :'DOCTOR'})
            }, 300),
        );

        getTopdoctor()

        return {
            dataDoctor,
            keySearch,
            listData
        }
    }
};
</script>

<style></style>
