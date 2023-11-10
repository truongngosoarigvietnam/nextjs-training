import axios from '../../axios';
import { ref } from 'vue';
import router from '@/router/router';
import { useStore } from 'vuex';

export default function () {
    const dataAllcode = ref({});
    let errorAllcode = ref('');
    const store = useStore();
    const fetchAllcode = async (inputType) => {
        try {
            const res = await axios.get(`/api/allcode?type=${inputType}`);

            if (res && res.errCode === 0) {
                dataAllcode.value = res.data;
            } else {
                errorAllcode.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorAllcode.value = err;
        }
    };
    return { dataAllcode, errorAllcode, fetchAllcode };
}
