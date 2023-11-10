<template>
    <div className="w-[30%] ml-[2%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Phương thức thanh toán</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="paymentId"
            @keyup="validateInput"
            @blur="validateInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option disabled selected value="">Chọn Phương thức thanh toán</option>
            <option v-for="item in dataAllcode" :key="item.id" :value="item.keyMap">
                {{
                    local === 'vn'
                        ? item.valueVi : item.valueEn
                }}
            </option>
        </select>
        <div class="text-red-500" v-if="errors.paymentId">
                Please select an payment.
        </div>
    </div>
</template>

<script>
import useAllcode from '@/services/allCodeService';
import { ref, computed , watch } from 'vue';
import i18n from '@/language/i18n';
import useFormValidation from '../../../manager-user/form/validate/FormValidation';
export default {
    props: {
        paymentId :String  
    },
    setup(props , {}) {
        const paymentId = ref('');
        const { validateSelectField, errors } = useFormValidation();
        watch(() => props.paymentId, (pa, pb) => {
            paymentId.value = pa 
            validateInput()
        })
        const local = computed(() => i18n.global.locale);
        const { dataAllcode, errorAllcode, fetchAllcode } = useAllcode();
        fetchAllcode('PAYMENT');
        const validateInput = () => {
            validateSelectField('paymentId', paymentId.value);
        };
        return {
            paymentId,
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