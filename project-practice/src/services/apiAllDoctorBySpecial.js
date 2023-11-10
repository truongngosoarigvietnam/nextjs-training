import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const listData = ref({});
    let errorData = ref('');
    let totalPage = ref(null)
    const fetchDoctorBySpecial = async ({pageIndex ,specialId}) => {
        
        try {
            if (!pageIndex) {
                pageIndex = 0
            }
            const res = await axios.get(`/api/get-doctor-by-special?page=${pageIndex}&size=6&specialId=${specialId}`);
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
    return { listData, errorData, fetchDoctorBySpecial , totalPage };
}
