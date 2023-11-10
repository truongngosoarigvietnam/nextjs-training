<template>
    <div className="w-[24%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
        required 
        id="password"
        :disabled="password"
            type="password"
            placeholder="Password"
            autocomplete="off"
            v-model="input"
            maxlength="20"
            @keyup="validateInput"
            @blur="validateInput"
            @input="$emit('update:modelValue', $event.target.value)"
            className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
        />
        <div class="text-red-500" v-if="errors.password">
            {{ errors.password }}
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import useFormValidation from '../validate/FormValidation';             
export default {
    props: {
        password : String
    },
    setup({password} , {}) {
        let input = ref("");
        if (password) {
            input.value = password
        }
    const {  validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
        validatePasswordField("password", input.value);
    };
    return { input, errors, validateInput , password };
  },
};
</script>

<style></style>
