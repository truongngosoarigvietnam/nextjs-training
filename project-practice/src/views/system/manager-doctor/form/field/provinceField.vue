<template>
    <div className="w-[30%] ml-[2%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Tỉnh Thành</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="provinceId"
            @keyup="validateInput"
            @blur="validateInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option disabled selected value="">Chọn Tỉnh thành</option>
            <option v-for="item in dataAllcode" :key="item.id" :value="item.keyMap">
                {{
                    local === 'vn'
                        ? item.valueVi : item.valueEn
                }}
            </option>
        </select>
        <div class="text-red-500" v-if="errors.provinceId">
                Please select an province.
        </div>
    </div>
</template>

<script>
import useAllcode from '@/services/allCodeService';
import { ref, computed , watch} from 'vue';
import i18n from '@/language/i18n';
import useFormValidation from '../../../manager-user/form/validate/FormValidation';

export default {
    props: {
        provinceId : String    
    },
    setup(props , {}) {
        const provinceId = ref('');
        watch(() => props.provinceId, (pa, pb) => {
            provinceId.value = pa
            validateInput()
        })
        const local = computed(() => i18n.global.locale);
        const { dataAllcode, errorAllcode, fetchAllcode } = useAllcode();
        fetchAllcode('PROVINCE');
        const { validateSelectField, errors } = useFormValidation();
        const validateInput = () => {
            validateSelectField('provinceId', provinceId.value);
        };
        return {
            provinceId,
            dataAllcode,
            local,
            errors,
            validateInput
        };
    },
};
</script>

<style>

</style>