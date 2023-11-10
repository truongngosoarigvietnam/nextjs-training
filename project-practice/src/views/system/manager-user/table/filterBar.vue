<template>
    <div class="mt-[7%] mb-[5%] flex gap-x-2">
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điều kiện</label>
            <select
                v-model="option"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:ring-blue-500 focus-visible:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
            >
                <option v-for="item in listPosition" :key="item.id" :value="item.value">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <div class="w-[50%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search by Name</label>
            <input
                type="text"
                :value="myFieldValueOnInput"
                @input="(event) => (myFieldValueOnInput = event.target.value)"
                className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
            />
        </div>
    </div>
</template>

<script>
import { ref, watch , inject } from 'vue';
import debounce from 'lodash.debounce';
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
                emitter.emit('handleSearch', pa);

            }, 500),
        );
        watch(option, (pa , pb) => {
            emitter.emit('handleOption', pa);
        })
        return {
            listPosition,
            myFieldValueOnInput,
            option
        };
    },
};
</script>

<style></style>
