import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const handleEditBlog = async (data) => {
        try {
            const res = await axios.put(`/api/edit-blog`, data);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };

    return { messege , handleEditBlog};
}
