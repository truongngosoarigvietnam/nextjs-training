import axios from '../../axios';
import { ref } from 'vue';
import router from '@/router/router';
import { useStore } from 'vuex';

export default function () {
    const dataUser = ref({});
    let errorLogin = ref('');
    const store = useStore();
    const fetchLogin = async (data) => {
        try {
            const res = await axios.post('/api/login', {
                email: data.email,
                password: data.password,
            });

            if (res && res.errCode === 0) {
                dataUser.value = res.user;
                store.dispatch('fetchLogin',res.user );
                localStorage.setItem('access_token', res.accessToken);
                router.push('/system');
            } else {
                errorLogin.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorLogin.value = err;
        }
    };
    return { dataUser, errorLogin, fetchLogin };
}
