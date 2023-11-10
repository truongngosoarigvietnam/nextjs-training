<template>
    <div className="flex px-[10%] my-10 ">
        <div className="w-full">
            <doctorField v-model="doctorId" v-bind:doctorId="doctorId" />
        </div>
        <div class="w-full">
            <label for="datepicker" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Choose a date:</label
            >
            <VueDatePicker
                v-model="date"
                :highlight="highlightedDates"
                :max-date="maxDate"
                highlight-disabled-days
                :format="dateFormat"
                :timepicker-options="{ enableTime: false }"
            />
        </div>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[56vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">STT</th>
                    <th scope="col" className="px-6 py-3">THỜI GIAN</th>
                    <th scope="col" className="px-6 py-3">HỌ VÀ TÊN</th>
                    <th scope="col" className="px-6 py-3">ĐỊA CHỈ</th>
                    <th scope="col" className="px-6 py-3">EMAIL</th>
                    <th scope="col" className="px-6 py-3">DETAILS</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item , index ) in listHistoryData"
                    :key="item.id"
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ index + 1 }}
                    </th>
                    <td className="px-6 py-4"> {{ formatDate(item.createdAt) }}</td>
                    <td className="px-6 py-4">{{ item.patientHistoryData.firstName}} {{ item.patientHistoryData.lastName }}</td>
                    <td className="px-6 py-4">{{item.patientHistoryData.address  }}</td>
                    <td className="px-6 py-4">{{ item.patientHistoryData.email }}</td>
                    <td className="px-6 py-4">
                        <img :src="item.files" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="text-center mt-2">
        <button
            :disabled="pageIndex <= 0"
            @click="prevPage"
            type="button"
            className="disabled:opacity-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            <font-awesome-icon :icon="['fas', 'arrow-left-long']" />
            <span className="sr-only">Icon description</span>
        </button>
        <button
            :disabled="pageIndex + 1 >= totalPage"
            @click="nextPage"
            type="button"
            className="disabled:opacity-30 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            <font-awesome-icon :icon="['fass', 'arrow-right-long']" />
            <span className="sr-only">Icon description</span>
        </button>
    </div>
    <confirmVue />
</template>

<script>
import usePatient from '@/services/apiPatient';
import doctorField from '../manager-doctor/form/field/doctorField.vue';
import { ref , watch ,inject } from "vue"
import moment from 'moment';
import { format } from 'date-fns';


export default {
    setup() {
        const { fetchListHistoryPatient, listHistoryData  , totalPage} = usePatient();
        const maxDate = ref(new Date()); // Ngày tối đa
        const dateFormat = ref('yyyy-MM-dd')
        const date = ref(moment(new Date()).add(0, 'days').startOf('day').valueOf());
        const doctorId = ref('');
        const emitter = inject('emitter');
        const pageIndex = ref(0);


        watch(doctorId, async (pa, pb) => {
            const res = await fetchListHistoryPatient({
                doctorId: pa,
                date: new Date(date.value).getTime(),
            });

        });

        function nextPage() {
            pageIndex.value = pageIndex.value + 1;
            fetchListHistoryPatient({
                pageIndex : pageIndex.value ,
                doctorId: doctorId.value,
                date: new Date(date.value).getTime(),

            });

        }
        const formatDate = (date) => {
            return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        };
        function prevPage() {
            pageIndex.value = pageIndex.value - 1;
            fetchListHistoryPatient({
                pageIndex : pageIndex.value ,
                doctorId: doctorId.value,
                date: new Date(date.value).getTime(),

            });
        }
        return {
            listHistoryData,
            maxDate,
            date,
            dateFormat,
            doctorId,
            moment,
            totalPage,
            pageIndex,
            nextPage,
            prevPage,
            formatDate
            
        };
    },
    components: {
        doctorField,
     
    }
};
</script>

<style></style>
