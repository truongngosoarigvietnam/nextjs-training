<template>
    <form className="w-full flex flex-wrap gap-x-[1%]" @submit.prevent="editUser">
        <emailField v-model="user.email" v-bind:email="user.email" />
        <PasswordFieldVue v-model="user.password" v-bind:password="user.password" />
        <firstNameField v-model="user.firstName" v-bind:firstName="user.firstName" />
        <lastNameFieldVue v-model="user.lastName" v-bind:lastName="user.lastName" />
        <PhoneFieldVue v-model="user.phoneNumber" v-bind:phone="user.phoneNumber" />
        <addressFieldVue v-model="user.address" v-bind:address="user.address" />
        <genderField v-model="user.gender" v-bind:genderId="user.gender" />
        <roleField v-model="user.roleId" v-bind:roleId="user.roleId" />
        <positionFieldVue v-model="user.positionId" v-bind:positionId="user.positionId" />
        <imageFieldVue v-model="preview" @change="previewImage" v-bind:preview="user.preview" />
        <div className="w-full my-4">
            <button
                type="submit"
                className="disabled:opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus-visible:ring-blue-800"
            >
                EDIT
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
import { reactive, ref, inject, watch } from 'vue';
import imageFieldVue from './Field/imageField.vue';
import useSubmitButtonState from './validate/UseSubmitButtonState';
import useFormValidation from './validate/FormValidation';
import useUserEdit from '@/services/edituser';
import { useRoute } from 'vue-router';
import useProfile from '@/services/profileUser';
import {useLoading} from 'vue-loading-overlay'

export default {
    setup() {
        let user = ref({
            email: '',
            password: 'khongthethaydoi',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'M',
            roleId: 'R1',
            positionId: 'P1',
            image: '',
            preview :''
        });
        const $loading = useLoading({
        // options
        color :'#009B00'
    });
        
        const { dataProfile, fetchProfile, data } = useProfile();
        const route = useRoute();
        const handleData = async (id) => {
        //     const loader = $loading.show({
        //     // Optional parameters
        // });
            const res = await fetchProfile(id);
            if (res && res.errCode === 0) {
                user.value = {
                    email: res.users.email,
                    password: 'khongthethaydoi',
                    firstName: res.users.firstName,
                    lastName: res.users.lastName,
                    phoneNumber: res.users.phoneNumber,
                    address: res.users.address,
                    gender: res.users.gender,
                    roleId: res.users.roleId,
                    positionId: res.users.positionId,
                    image: res.users.image,
                    preview : res.users.image
                };
            }
            // loader.hide()

        };
        if (route.params.id) {
            handleData(route.params.id);
            watch(route, (pa, pb) => {
                console.log('check ', pa.params.id);
                handleData(pa.params.id);
            });
        }

        const { errors } = useFormValidation();
        const { messege, handleEditUser } = useUserEdit();
        const swal = inject('$swal');
        const emitter = inject('emitter'); 
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
        const editUser = async () => {
            const loader = $loading.show({
            // Optional parameters
        });
            const res = await handleEditUser({
                id: route.params.id,
                email: user.value.email,
                password: 'khongthethaydoi',
                firstName: user.value.firstName,
                lastName: user.value.lastName,
                phoneNumber: user.value.phoneNumber,
                address: user.value.address,
                gender: user.value.gender,
                roleId: user.value.roleId,
                positionId: user.value.positionId,
                image: user.value.image,
            });
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
            user.value.image = event.target.files[0];

            if (input.files) {
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        user.value.preview = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
        return {
            user,
            editUser,
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
