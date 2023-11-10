<template>
    <div className="w-[55%] ml-[2%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Thông tin giới thiệu </label>
        <textarea
            id="message"
            v-model="textDoctor"
            @keyup="validateInput"
            @blur="validateInput"
            @input="$emit('update:modelValue', $event.target.value)"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
        ></textarea>
        <div class="text-red-500" v-if="errors.description">
            {{ errors.description }}
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import useFormValidation from '../../../manager-user/form/validate/FormValidation';

export default {
    props: {
        description: String,
    },
    setup(props, {}) {
        const textDoctor = ref(props.description);
        watch(
            () => props.description,
            (pa, pb) => {
                textDoctor.value = pa;
                validateInput()
            },
        );
        const { validateNameField, errors } = useFormValidation();
        const validateInput = () => {
            validateNameField('description', textDoctor.value);
        };

        return { textDoctor , errors , validateInput  };
    },
};
</script>

<style></style>
