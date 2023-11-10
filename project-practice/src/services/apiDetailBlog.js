import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    let dataDetail = ref();
    let errorData = ref('');
    const fetchDetailBlog = async (id) => {
        try {
            const res = await axios.get(`/api/get-blog-detail?id=${id}`);

            if (res && res.errCode === 0) {
          
                dataDetail.value = res.blog;
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
 
    return { dataDetail, errorData, fetchDetailBlog   };
}
