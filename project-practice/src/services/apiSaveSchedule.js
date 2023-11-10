import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    let dataScheduleDoctor = ref();
    let errorData = ref('');
    const saveSchedule = async (data) => {
        try {
            const res = await axios.post(`/api/bulk-create-schedule`, data);
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
 
    return { dataScheduleDoctor, errorData, saveSchedule    };
}
