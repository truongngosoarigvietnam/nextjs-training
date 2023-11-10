import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const listData = ref({});
    let errorData = ref('');
    const fetchListDoctor = async () => {
        try {
            const res = await axios.get(`/api/get-all-doctors`);

            if (res && res.errCode === 0) {
          
                listData.value = res.data;
   
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
    const postInfoDoctors = async (data) => {
        try {
            const res = await axios.get(`/api/save-info-doctors`,data);

            if (res && res.errCode === 0) {
          
                listData.value = res.data;
   
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
    
    return { listData, errorData, fetchListDoctor , postInfoDoctors  };
}
