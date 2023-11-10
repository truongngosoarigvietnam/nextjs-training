<template>
    <form className="w-full flex flex-wrap gap-x-[1%]" @submit.prevent="createUser">
        <emailField v-model="user.email" />
        <PasswordFieldVue v-model="user.password" />
        <firstNameField v-model="user.firstName" />
        <lastNameFieldVue v-model="user.lastName" />
        <PhoneFieldVue v-model="user.phoneNumber" />
        <addressFieldVue v-model="user.address" />
        <genderField v-model="user.gender" />
        <roleField v-model="user.roleId" />
        <positionFieldVue v-model="user.positionId" />
        <imageFieldVue v-model="preview" @change="previewImage" v-bind:preview="user.preview" />
        <div className="w-full my-4">
            <button
                :disabled="isSignupButtonDisabled"
                type="submit"
                className="disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-800"
            >
                SAVE
            </button>
            <div></div>
        </div>
    </form>
</template>

<script>
import addressFieldVue from './Field/addressField.vue';
import emailField from './Field/emailField.vue';
import firstNameField from './Field/firstNameField.vue';
import lastNameFieldVue from './Field/lastNameField.vue';
import PasswordFieldVue from './Field/PasswordField.vue';
import PhoneFieldVue from './Field/PhoneField.vue.vue';
import genderField from './Field/genderField.vue';
import roleField from './Field/roleField.vue';
import positionFieldVue from './Field/positionField.vue';
import { reactive, ref, inject } from 'vue';
import imageFieldVue from './Field/imageField.vue';
import useSubmitButtonState from './validate/UseSubmitButtonState';
import useFormValidation from './validate/FormValidation';
import useUser from '@/services/createUser';
import {useLoading} from 'vue-loading-overlay'

export default {
    setup() {
        let user = reactive({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'M',
            roleId: 'R1',
            positionId: 'P0',
            image: '',
            preview : ''
        });
        const $loading = useLoading({
        // options
        color :'#009B00'
    });
        const emitter = inject('emitter'); 
        const { errors } = useFormValidation();
        const { messege, handleCreateUser } = useUser();
        const swal = inject('$swal');
        const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);
        const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer);
                toast.addEventListener('mouseleave', swal.resumeTimer);
            },
        });
        const createUser = async () => {
            const loader = $loading.show({
            // Optional parameters
        });
         const res =  await handleCreateUser(user);
            if (res.errCode !== 0) {
                loader.hide()

                Toast.fire({
                    icon: 'error',
                    title: res.errMessage,
                });
            } else {
                loader.hide()
                Toast.fire({
                    icon: 'success',
                    title: res.errMessage,
                });
                emitter.emit('myevent', 100);

            }
        };
        function previewImage(event) {
            var input = event.target;
            if (input.files) {
                var input = event.target;
                user.image = event.target.files[0];

                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        user.preview = e.target.result
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
        return {
            user,
            createUser,
            previewImage,
            isSignupButtonDisabled,
        };
    },
    components: {
        emailField,
        firstNameField,
        PhoneFieldVue,
        PasswordFieldVue,
        lastNameFieldVue,
        addressFieldVue,
        genderField,
        roleField,
        positionFieldVue,
        imageFieldVue,
    },
};
</script>

<style></style>
