import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const handleCreateSpecial = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('descriptionHTML', data.description);

        try {
            const res = await axios.post(`/api/create-new-specialty`, formData);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };
    const handleDeleteSpecial = async (id) => {
        try {
            const res = await axios.get(`/api/delete-specialty?id=${id}`)
            return res
        } catch (error) {
            
        }
    }
    return { messege , handleCreateSpecial , handleDeleteSpecial };
}
