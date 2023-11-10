import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const listData = ref({});
    let errorData = ref('');
    const getDetailsDoctor = async (id) => {
        try {
            const res = await axios.get(`/api/get-detail-doctor-by-id?id=${id}`);

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
    const getExtraInforDoctorById = async (id) => {
        try {
            const res = await axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${id}`);

            if (res && res.infor.errCode === 0) {
                listData.value = res.infor.data;
                
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
    return { listData, errorData, getDetailsDoctor , getExtraInforDoctorById  };
}
