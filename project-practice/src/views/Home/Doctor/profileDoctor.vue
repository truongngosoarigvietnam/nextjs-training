<template>
    <div className="profile-doctor-container">
            <div className="flex">
            <div className="w-[10%]">
      
                 <img className="w-full rounded-[50%]" :src="listData.image" />
                 
           
            </div>
            <div className="w-[90%] flex flex-col pl-11">
               <div className="text-xl font-semibold"> {{ listData.firstName }} {{ listData.lastName }}</div>
            <div className="down">
                <span>
                    {{ listData.Markdown.description }} 
                    </span>
                    <div className="uppercase font-bold"> 
                        <p>giá khám : {{ listData2.priceData.valueVi  }} vnd  </p> 
                        <p> Thời gian : {{ dataSend.timeTypeData.valueVi }} {{ moment.unix(dataSend.date / 1000).format('dddd - DD/MM/YYYY') }} </p>
          </div>
              </div> 
          </div>
         
        </div>
       
       
 


         
        </div>
</template>

<script>
import useDoctor from '@/services/apiDetailDoctor';
import {ref , watch , computed} from "vue"
import { useRoute } from 'vue-router';
import moment from 'moment';

export default {
    props: {
        time: Object,
        idDoctor : String
    },
    setup(props) 
    {
        const idDoctor = ref('')
        const dataSend = ref({
            timeTypeData: {
                valueVi: '',
                date : '1683824400000'
            }
        })
        watch(() => props.time, (pa, pb) => {
            dataSend.value = pa
        })
        watch(() => props.idDoctor, (pa, pb) => {
            idDoctor.value = pa

        })
        const { getExtraInforDoctorById , getDetailsDoctor } = useDoctor();

        const route = useRoute();
        const listData = ref({
            Markdown: {
                description : ''
            }
        })
        const listData2 = ref({
            nameClinic: '',
            addressClinic: '',
            priceData: {
                valueVi: '10000',
            },
        });
        const handleData = async () => {
            const res = await getExtraInforDoctorById(idDoctor.value);
            const res2 = await getDetailsDoctor(idDoctor.value);
            if (res && res.infor.errCode === 0) {
                listData2.value = res.infor.data;
            }
            if (res2 && res2.errCode === 0) {
                listData.value = res2.data;
            }
        };
        handleData()
        return {
            listData2,
            listData,
            dataSend,
            moment
        }

    }

}
</script>

<style>

</style>