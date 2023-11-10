import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const handleCreateUser = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);

        formData.append('phoneNumber', data.phoneNumber);

        formData.append('address', data.address);
        formData.append('gender', data.gender);

        formData.append('roleId', data.roleId);
        formData.append('positionId', data.positionId);
        try {
            const res = await axios.post(`/api/create-new-user`, formData);

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
