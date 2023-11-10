<template>
    <div class="bg-background h-[100vh]">
        <div class="w-[400px] h-[400px] m-auto absolute bg-white rounded-[10px] top-0 left-0 bottom-0 right-0">
            <form @submit.prevent="onSubmit" class="p-[15px] flex flex-wrap">
                <div class="flex-col12 w-full text-center font-semibold text-2xl pt-2.5">Login</div>
                <div class="my-[7px] flex-col12 w-full">
                    <label class=""> Username</label>
                    <input
                        type="text"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Username"
                        name="userName"
                        v-model="Username"
                        :class="[error.status ? 'border-red-600' : 'border-0']"
                    />
                </div>
                <div class="my-[7px] flex-col12 w-full">
                    <label class=""> Password :</label>
                    <div
                        class="relative block w-full py-[0.375rem] font-normal leading-[1.5] text-[#212529] bg-white bg-clip-padding rounded-t"
                    >
                        <input
                            :type="iconToggle ? 'text' : 'password'"   
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            name="password"
                            placeholder="Password"
                            v-model="Password"
                            :class="[error.status ? 'border-red-600' : 'border-0']"
                        />

                        <!-- {isShowPassword ? (
                                    <FontAwesomeIcon
                                        icon={faEyeSlash}
                                        class="translate-y-[-50%] font-[25px] absolute right-2 top-[50%] opacity-50 cursor-pointer hover:opacity-100"
                                    />
                                ) : ( -->
                        <!-- <FontAwesomeIcon
                                        icon={faEye}
                                        class=" translate-y-[-50%] font-[25px] absolute right-2 top-[50%] opacity-50 cursor-pointer hover:opacity-100" -->
                        <!-- /> -->
                        <!-- )} -->
                        <i
                            class="translate-y-[-50%] font-[25px] absolute right-2 top-[50%] opacity-50 cursor-pointer hover:opacity-100"
                        >
                            <font-awesome-icon :icon="['far', 'eye-slash']" v-if="iconToggle" @click="togglePassword" />
                            <font-awesome-icon :icon="['far', 'eye']" v-else  @click="togglePassword" />
                        </i>
                    </div>
                </div>

                <div class="flex-col12 w-full">
                    <button
                        type="submit"
                        class="w-full outline-none border-none rounded-[15px] h-[30px] my-2.5 bg-background text-sm text-white"
                    >
                        Login
                    </button>
                </div>
                <div class="flex-col12 w-full mb-1" :class="[error.status ? 'visible' : 'invisible']">
                    <p class="h-4 text-center text-red-400 font-bold">{{ error.text }}</p>
                </div>
                <div class="flex-col12 w-full">
                    <a href="#" class="text-[12px] outline-none list-none hover:opacity-60"> Forgot your password </a>
                </div>
                <div class="flex-col12 w-full text-center">
                    <span class="text-center">Or Login with :
                        {{ data }}
                    </span>
                </div>
                <div class="flex-col12 w-full flex text-[45px] justify-center gap-2">
                    <span>
                        <svg class="h-9 w-full" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                                fill="white"
                            ></path>
                            <path
                                d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
                                fill="#0075FA"
                            ></path>
                        </svg>
                    </span>
                    <span>
                        <svg class="h-10 w-full" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
                                fill="#4285F4"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
                                fill="#34A853"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
                                fill="#FBBC04"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
                                fill="#EA4335"
                            ></path>
                        </svg>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import useLogin from '@/services/loginService';
export default {
    name: 'login',
    setup() {
        const { dataUser ,errorLogin, fetchLogin } = useLogin();
        const store = useStore();
        const Username = ref('');
        const Password = ref('');
        const iconToggle = ref(false);
        let error = ref({
            text: '',
            status: false,
        });
        function togglePassword() {
            iconToggle.value = !iconToggle.value;
        }
        async function onSubmit() {
            if (Username.value.length === 0 || Password.value.length === 0) {
                error.value = {
                    text: 'vui lòng nhập Username or password',
                    status: true,
                };
            } else {
             const res =  await fetchLogin({
                    email: Username.value,
                    password: Password.value,
                });
                console.log('sau khi call' ,res);
                
                if (res.errCode !== 0) {
                    error.value = {
                        text: 'Username or password wrong',
                        status: true,
                    };
                }
            }
        }
        return {
            onSubmit,
            togglePassword,
            Username,
            Password,
            error,
            errorLogin,
            dataUser,
            iconToggle,
        };
    },
};
</script>

<style></style>
