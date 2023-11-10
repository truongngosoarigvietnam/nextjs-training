import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    const messege = ref(null);
    const createBlog = async (data) => {
        const formData = new FormData();

        formData.append('userId', data.userId);
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('image', data.thumb);
        formData.append('topic', data.topic);
        try {
            const res = await axios.post(`/api/save-info-blogs`, formData);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };
    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`/api/delete-blog?id=${id}`);

            if (res && res.errCode === 0) {

            } else {
                messege.value = res.errMessage;
            }
            return res;
        } catch (err) {
            messege.value = err;
        }
    };

    return { messege , createBlog , deleteBlog};
}
