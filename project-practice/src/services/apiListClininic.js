import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const listData = ref({});
    let errorData = ref('');
    let totalPage = ref(null)

    const fetchListClinic = async ({pageIndex , size}) => {
        try {
            if (!pageIndex) {
                pageIndex = 0
            }
            if (!size) {
                size= 5
            }
            const res = await axios.get(`/api/get-all-clinic?page=${pageIndex}&size=${size}`);

            if (res && res.errCode === 0) {
          
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
    return { listData, errorData, fetchListClinic , totalPage };
}
