<template>
    <div className="w-[40%] ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Chuyên Khoa</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="specialListId"
            @keyup="validateInput"
            @blur="validateInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option disabled selected value="">Chọn Chuyên Khoa</option>
            <option v-for="item in listData" :key="item.id" :value="item.id">
               {{ item.name }}
            </option>
        </select>
        <div class="text-red-500" v-if="errors.specialListId">
                Please select an special.
        </div>
    </div>
</template>

<script>
import { ref, computed  , watch} from 'vue';
import i18n from '@/language/i18n';
import useSpecial from "@/services/apiListSpecial"
import useFormValidation from '../../../manager-user/form/validate/FormValidation';

export default {
    props: {
        specialtyId : String
    },
    setup(props , {}) {
        const specialListId = ref('');
        watch(() => props.specialtyId, (pa, pb) => {
            specialListId.value = pa
            validateInput()
        })
        const local = computed(() => i18n.global.locale);
        const { errorData, fetchListSpecial, listData } = useSpecial();
        fetchListSpecial({pageIndex : '0' , size : '9'})
        const { validateSelectField, errors } = useFormValidation();
        const validateInput = () => {
            validateSelectField('specialListId', specialListId.value);
        };
        return {
            specialListId,
            listData,
            local,
            errors,
            validateInput
        };
    },
};
</script>

<style>

</style>