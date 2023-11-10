import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const listData = ref({});
    let errorData = ref('');
    let totalPage = ref(null)
    const fetchDoctorByClinic = async ({pageIndex ,clinicId}) => {
        
        try {
            if (!pageIndex) {
                pageIndex = 0
            }
            const res = await axios.get(`/api/get-doctor-by-clinic?page=${pageIndex}&size=6&clinicId=${clinicId}`);
            if (res) {
                listData.value = res.data.data;
                totalPage.value = res.data.totalPages
   
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
    return { listData, errorData, fetchDoctorByClinic , totalPage };
}
