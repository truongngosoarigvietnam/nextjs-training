import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    let dataProfile = ref();
    let errorData = ref('');
    let data 
    const fetchProfile = async (id) => {
        try {
            const res = await axios.get(`/api/get-user-detail?id=${id}`);

            if (res && res.errCode === 0) {
          
                dataProfile.value = res.users;
                data = res.users
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
 
    return { dataProfile, errorData, fetchProfile , data  };
}
