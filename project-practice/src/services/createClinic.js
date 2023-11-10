import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const handleCreateClinic = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('address', data.address);

        formData.append('descriptionHTML', data.description);

        try {
            const res = await axios.post(`/api/create-new-clinic`, formData);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };
    const handleDeleteClinic= async (id) => {
        try {
            const res = await axios.get(`/api/delete-clinic?id=${id}`)
            return res
        } catch (error) {
            
        }
    }
    return { messege , handleCreateClinic , handleDeleteClinic };
}
