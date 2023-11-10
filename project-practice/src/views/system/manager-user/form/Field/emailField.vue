<template>
    <div className="w-[24%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
            id="email"
            required
            type="email"
            placeholder="Email"
            autocomplete="off"
            v-model="input"
            @keyup="validateInput"
            @blur="validateInput"
            @input="$emit('update:modelValue', $event.target.value)"
            className=" block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
        />
        <div class="text-red-500" v-if="errors.email">
            {{ errors.email }}
        </div>
    </div>
</template>

<script>
import { ref , watch , toRefs , onMounted } from 'vue';
import useFormValidation from '../validate/FormValidation';
export default {
    props: {
        email : String
    },
    setup(props, {}) {
        let input = ref(props.email);
        watch(() => props.email, (pa , pb) => {
            input.value = pa
        })
        const { validateEmailField, errors } = useFormValidation();
        const validateInput = () => {
            validateEmailField('email', input.value);
        };

        return { input, errors, validateInput };
    },
};
</script>

<style></style>
