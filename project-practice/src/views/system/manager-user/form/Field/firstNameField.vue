<template>
    <div className="w-[24%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">firstName</label>
        <input
            type="text"
            id="firstName"
            placeholder="FirstName"
            autocomplete="off"
            v-model="input"
            @keyup="validateInput"
            @blur="validateInput"
            @input="($event) => $emit('update:modelValue', $event.target.value)"
            className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
        />
        <div class="text-red-500" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script>
import { ref , watch } from 'vue';
import useFormValidation from '../validate/FormValidation';
export default {
    props: {
        firstName : String
    },
    setup(props , {}) {
        let input = ref(props.firstName);
        watch(() => props.firstName, (pa , pb) => {
            input.value = pa
        })
    const { validateNameField, errors } = useFormValidation();
    const validateInput = () => {
        validateNameField("name", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>

<style></style>
