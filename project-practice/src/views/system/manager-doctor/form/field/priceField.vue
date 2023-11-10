<template>
    <div className="w-[30%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Gía</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="priceId"
            @keyup="validateInput"
            @blur="validateInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option disabled selected value="">Chọn Giá Cả</option>
            <option v-for="item in dataAllcode" :key="item.id" :value="item.keyMap">
                {{
                    local === 'vn'
                        ? new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                          }).format(item.valueVi)
                        : new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                          }).format(item.valueEn)
                }}
            </option>
        </select>
        <div class="text-red-500" v-if="errors.priceId">
                Please select an price.
        </div>
    </div>
</template>

<script>
import useAllcode from '@/services/allCodeService';
import useFormValidation from '../../../manager-user/form/validate/FormValidation';
import { ref, computed , watch } from 'vue';
import i18n from '@/language/i18n';
export default {
    props: {
        priceId :String
    },
    setup(props , {}) {
        const priceId = ref(props.priceId);
        watch(() => props.priceId, (pa, pb) => {
            priceId.value = pa
            validateInput()
        })
        const local = computed(() => i18n.global.locale);
        const { dataAllcode, errorAllcode, fetchAllcode } = useAllcode();
        fetchAllcode('PRICE');
        const { validateSelectField, errors } = useFormValidation();
        const validateInput = () => {
            validateSelectField('priceId', priceId.value);
        };
        return {
            priceId,
            dataAllcode,
            local,
            errors,
            validateInput
            
        };
    },
};
</script>

<style></style>
