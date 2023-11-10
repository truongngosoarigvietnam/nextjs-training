<template>
           <div class="pt-[3%] h-[100px]">
                    <p class="text-xl font-black text-[#0071BA]">DANH SÁCH CÁC Bác sĩ</p>
                </div>
                <handbookBarVue />
                <div class="min-h-[56%] shadow-md mt-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">STT</th>

                                <th scope="col" className="px-6 py-3">firstName</th>
                                <th scope="col" className="px-6 py-3">lastName</th>
                                <th scope="col" className="px-6 py-3">email</th>
                                <th scope="col" className="px-6 py-3">Position</th>

                                <th scope="col" className="px-6 py-3">Thumb</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item , index) in listData"
                                :key="index"
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                 {{ index +1 }}
                                </th>
                                <td className="px-6 py-4">{{ item.User.firstName }}</td>

                                <td className="px-6 py-4">{{ item.User.lastName }}</td>
                                <td className="px-6 py-4">{{ item.User.email }}</td>
                                <td className="px-6 py-4">{{ item.User.positionData.valueVi }}</td>

                                <td className="px-6 py-4">
                                    <img
                                        className="h-12 w-12 bg-cover bg-no-repeat bg-center cursor-pointer"
                                        :src="item.User.image"
                                    />
                                </td>
 
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-2 ">
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
</template>

<script>
import useDoctorByClinic from "@/services/apiAllDoctorByClinic"
import {ref , inject} from "vue"
export default {
    setup() {
        const { fetchDoctorByClinic, listData, totalPage } = useDoctorByClinic()
        const emitter = inject('emitter');
        const clinicId = ref('')
        const pageIndex = ref(0);
        function nextPage() {
            pageIndex.value = pageIndex.value + 1;
            fetchDoctorByClinic({pageIndex : pageIndex.value ,clinicId : clinicId.value})

        }
        function prevPage() {
            pageIndex.value = pageIndex.value - 1;
            fetchDoctorByClinic({pageIndex : pageIndex.value ,clinicId : clinicId.value})

        }


        emitter.on('eventDoctorByClinic', (id) => {
            // *Listen* for event
            clinicId.value = id
            fetchDoctorByClinic({pageIndex : pageIndex.value , clinicId: id})
        });
        return {
            listData,
            totalPage,
            pageIndex,
            nextPage,
            prevPage
        }
    }

}
</script>

<style>

</style>