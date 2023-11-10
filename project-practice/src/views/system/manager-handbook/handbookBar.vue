<template>
    <div class="mt-[2%] mb-[5%] flex gap-x-2">
        <div class="w-[50%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
            <input
                type="text"
                :value="myFieldValueOnInput"
                @input="(event) => (myFieldValueOnInput = event.target.value)"
                className="focus-visible:outline-none block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
            />
        </div>
        <div class="flex items-center text-3xl w-[50%] justify-center"> 
           <div class="flex items-center gap-x-3"> 
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TẠO MỚI BLOG</label>
            <font-awesome-icon @click="handleCreate" :icon="['fas', 'plus']" class="bg-[#0071BA] p-2 rounded-[50%] cursor-pointer text-white hover:text-xl" />
           </div>
        </div>
    </div>
</template>

<script>
import { ref, watch , inject } from 'vue';
import debounce from 'lodash.debounce';
import router from '@/router/router';
export default {
    setup() {
        const option = ref('ALL')
        const emitter = inject('emitter'); 
        const listPosition = ref([
            { id: 1 , value : 'DOCTOR', name: 'bác sĩ' },
            { id: 2,value :'ADMIN' , name: 'quản trị viên' },
            { id: 3,value : 'PATIENT' , name: 'bệnh nhân' },
            { id: 4,value : 'ALL' , name: 'Tất cả' },
        ]);
        const myFieldValueOnInput = ref('');
        watch(
            myFieldValueOnInput,
            debounce((pa, pb) => {
                emitter.emit('handleSearchBlog', pa);

            }, 500),
        );
        const handleCreate = () => {
            router.push('/system/manager-handbook/create-handbook');
        }

        return {
            listPosition,
            myFieldValueOnInput,
            option,
            handleCreate
        };
    },
};
</script>

<style></style>
