import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const handleCreateUser = async (data) => {
        try {
            const res = await axios.post(`/api/create-new-user`, data);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };
    const handleDeleteUser = async (id) => {
        try {
            const res = await axios.delete(`/api/delete-user?id=${id}`)
            return res
        } catch (error) {
            
        }
    }
    return { messege , handleCreateUser , handleDeleteUser };
}
