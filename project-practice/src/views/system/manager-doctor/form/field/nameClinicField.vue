<template>
     <div className="w-[30%]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Tên phòng khám </label>
            <input
            type="text"
            v-model="clinicName"
            @keyup="validateInput"
            @blur="validateInput"
            @input="$emit('update:modelValue', $event.target.value)"
                className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
            />
            <div class="text-red-500" v-if="errors.name">
            {{ errors.name }}
        </div>
        </div>
</template>

<script>
import { ref, watch } from "vue"
import useFormValidation from '../../../manager-user/form/validate/FormValidation';

export default {
    props: {
        nameClinic : String
    },
    setup(props , {}) {
        const clinicName = ref('')
        watch(() => props.nameClinic, (pa, pb) => {
            clinicName.value = pa
            validateInput()
        })

        const { validateNameField, errors } = useFormValidation();
        const validateInput = () => {
            validateNameField('name', clinicName.value);
        };
        return {
            clinicName,
            validateInput,
            errors
        }
        }
}
</script>

<style>

</style>