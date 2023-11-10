<template>
   <div className="w-[24%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
            <select
                v-model="gender"
                @change="$emit('update:modelValue', $event.target.value)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:ring-blue-500 focus-visible:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
            >
                <option v-for="item in listGender" :key="item.id" :value="item.keyMap">
                    {{ local === 'vn' ? item.valueVi : item.valueEn }}
                </option>
            </select>
        </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, render , watch } from 'vue';
import i18n from '@/language/i18n';

export default {
    props: {
        genderId : String
    },
    setup(props, { }) {
        const gender = ref('M');
        // if (props) {
        //     gender.value = props.genderId
        // }
        watch(() => props.genderId, (pa , pb) => {
            gender.value = pa
        })
        const store = useStore()
        const local = computed(() => i18n.global.locale);
        store.dispatch('fetchGender', { type: 'GENDER' });
        const listGender = computed(() => store.state.listGender);
        return {
            listGender,
            gender,
            local
        }
        }
}
</script>

<style>

</style>