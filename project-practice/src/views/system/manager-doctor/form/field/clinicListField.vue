<template>
    <div className="w-[40%] ml-[3%] ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Phòng khám</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="clinicId"
            @keyup="validateInput"
            @blur="validateInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option disabled selected value="">Chọn Phòng khám</option>
            <option v-for="item in listData" :key="item.id" :value="item.id">
               {{ item.name }}
            </option>
        </select>
        <div class="text-red-500" v-if="errors.clinicId">
                Please select an clinic.
        </div>
    </div>
</template>

<script>
import useClinic from "@/services/apiListClininic"
import { ref, computed , watch } from 'vue';
import i18n from '@/language/i18n';
import useFormValidation from '../../../manager-user/form/validate/FormValidation';

export default {
    props: {
        clinicId : String   
    },
    setup(props , {}) {
        const clinicId = ref('');
        const { validateSelectField, errors } = useFormValidation();
        watch(() => props.clinicId, (pa, pb) => {
            clinicId.value = pa
            validateInput()
        
        })
        const local = computed(() => i18n.global.locale);
        const {errorData , fetchListClinic , listData } = useClinic();
        fetchListClinic({pageIndex : 0 , size : '9'})
        const validateInput = () => {
            validateSelectField('clinicId', clinicId.value);
        };
        return {
            clinicId,
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