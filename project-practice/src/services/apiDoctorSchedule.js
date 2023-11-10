import axios from '../../axios';
import { ref } from 'vue';
export default function () {
    let dataScheduleDoctor = ref();
    let errorData = ref('');
    const fetchScheduleDoctor = async ({doctorId , date}) => {
        try {
            const res = await axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);

            if (res && res.errCode === 0) {
          
                dataScheduleDoctor.value = res.users;

            } else {
                errorData.value = res.errMessage;
            }
            return res;
        } catch (err) {
            errorData.value = err;
        }
    };
 
    return { dataScheduleDoctor, errorData, fetchScheduleDoctor    };
}
