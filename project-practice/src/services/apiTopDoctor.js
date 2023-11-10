import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    let dataDoctor = ref();
    let errorData = ref('');

    const getTopdoctor = async (limit) => {
        try {
            if (!limit) {
                limit = 10
            }
            const res = await axios.get(`/api/search?zipcode=7830060`);

            if (res && res.errCode === 0) {        
                dataDoctor.value = res.data;
            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
 
    return { dataDoctor, errorData, getTopdoctor};
}
