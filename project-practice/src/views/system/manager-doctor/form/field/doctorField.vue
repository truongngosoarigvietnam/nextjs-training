<template>
    <div className="w-[40%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn bác sĩ</label>
            <select
            @change="$emit('update:modelValue', $event.target.value)"
            @keyup="validateInput"
            @blur="validateInput"
            v-model="doctorId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
            <option disabled selected value="">Chọn một Bác sĩ</option>
            <option v-for="item in listData" :key="item.id" :value="item.id">
                <!-- {{ local === 'vn' ? item.valueVi : item.valueEn }} -->
                {{ item.firstName }} {{ item.lastName }}
            </option>
            </select>
            <div class="text-red-500" v-if="errors.doctorId">
                Please select an doctor.
        </div>
        </div>
   
</template>

<script>
import useDoctor from "@/services/apiListDoctor"
import useFormValidation from '../../../manager-user/form/validate/FormValidation';
import {ref , watch} from "vue"
export default {
    props: {
        doctorId : String
    },
    setup(props , {}) {
        const doctorId = ref('')
        const { listData, fetchListDoctor, errorData } = useDoctor()
        fetchListDoctor()
        const { validateSelectField, errors } = useFormValidation();
        const validateInput = () => {
            validateSelectField('doctorId', doctorId.value);
        };
        watch(() => props.doctorId, () => {
            validateInput()
        })
        return {
            listData,
            doctorId,
            validateInput,
            errors
        }
    }

}
</script>

<style>

</style>