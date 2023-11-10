<template>
    <div class="h-[70px] ">
        <div class="flex items-center shadow-lg h-full gap-x-2 px-[5%]">
            <font-awesome-icon :icon="['fass', 'arrow-left']" class="text-2xl cursor-pointer" />
            <p class="text-2xl">Chuyên khoa</p>
        </div>
    </div>
    <div class="px-[5%] font-bold">
        <router-link :to="`/doctor/${item.id}`" class="border-b-[1px] border-gray-200 cursor-pointer py-4 block" v-for="item in listData" :key="item.id">
            <div class="flex gap-x-4 my-4 ">
                <img class="w-[100px] h-[67px]" :src="item.image" />
                <div>
                    <div class="font-normal"> </div>
                    <div class="font-light">{{ item.name }} </div>
                     </div>
                 </div>

             </router-link>
    </div>
</template>

<script>
import useSpecial from "@/services/apiListSpecial"
import { ref , watch } from "vue"

export default {
    setup() {
        const { fetchListSpecial , listData} = useSpecial()

       

        fetchListSpecial({pageIndex : '0' , size : '9'})

        return {
            listData,
            
        }
    }
};
</script>

<style></style>
