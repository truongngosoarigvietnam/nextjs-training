<template>
    <div>
        <!-- Modal backdrop -->
        <div v-show="isShowModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
            <!-- Modal content -->
            <div  @click="handleShow" class="relative top-0 left-0 w-full h-full">

            </div>
            <div class="bg-white rounded-lg p-6 max-w-[1440px] w-[50%] overflow-y-auto absolute top-0 left-0 right-0 bottom-0 m-auto h-[90%] py-8  ">
                <!-- Modal header -->
                <h2 class="text-lg font-bold mb-4 text-center">Thông tin đặt lịch khám</h2>
                <!-- Modal body -->
                <div><profileDoctor v-bind:time="chooseData.chosseDate" :idDoctor="idDoctor" /></div>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " for="name"> Họ tên </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            v-model="name"
                            placeholder="Họ và tên"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " for="phone"> Số điện thoại </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            v-model="phone"
                            placeholder="Số điện thoại"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " for="address"> Địa chỉ Liên hệ </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            v-model="address"
                            placeholder="Địa chỉ"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " for="address"> Địa chỉ Mail </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="email"
                            v-model="email"
                            placeholder="Địa chỉ email"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " for="dob"> Ngày sinh </label>
                        <input
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dob"
                            type="date"
                            v-model="date"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="gender"> Giới tính </label>
                        <select
                            class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender"
                            v-model="gender"
                            required
                        >
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option value="0">Khác</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Lý do Khám</label
                        >
                        <textarea
                            id="message"
                            v-model="reason"
                            required
                            rows="4"
                            class="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>
                    <div class="mb-4">
                      <button type="submit" class="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import profileDoctor from './profileDoctor.vue';
import { ref , watch , inject} from "vue"
import useBooking from "@/services/apiBooking"
import moment from 'moment';
import {useLoading} from 'vue-loading-overlay'
import { useRoute } from 'vue-router';

export default {
  props: {
        dataDate: String,
        idDoctor : String
  },
  setup(props) {

    const $loading = useLoading({
        // options
        color :'#009B00'
    });

    const idDoctor = ref('')
    const name = ref('')
    const phone = ref('')
    const email = ref('')
    const address = ref('')
    const date = ref('')
    const gender = ref('M')
    const reason = ref('')
    const isShowModal = ref(false)
    const emitter = inject('emitter');
    const swal = inject('$swal');
      const chooseData = ref('')
      const route = useRoute();

    watch(() => props.isShowModal, (pa, pb) => {
      isShowModal.value = pa
    })
    watch(() => props.idDoctor, (pa, pb) => {
        idDoctor.value = pa
    })
    const Toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', swal.stopTimer);
                  toast.addEventListener('mouseleave', swal.resumeTimer);
              },
          });
    const { createBooking } = useBooking()
    // moment.unix(1656090000000 / 1000).format('dddd - DD/MM/YYYY')
    const handleSubmit = async () => {
      const loader = $loading.show({
            // Optional parameters
        });
      const res = await createBooking({
        doctorId: idDoctor.value,
        email: email.value,
        address: address.value,
        timeString: chooseData.value.chosseDate.timeTypeData.valueVi + '' +  moment.unix(chooseData.value.dataDate / 1000).format('dddd - DD/MM/YYYY'),
        fullName: name.value,
        phoneNumber: phone.value,
        reason: reason.value,
        birthDay: date.value,
        timeType: chooseData.value.chosseDate.timeType,
        selectedGender: gender.value,
        doctorName: chooseData.value.chosseDate.doctorData.lastName + chooseData.value.chosseDate.doctorData.firstName,
        date : chooseData.value.dataDate

      })
      if (res && res.infor.errCode === 0) {
        loader.hide()
        Toast.fire({
                    icon: 'success',
                    title: "Đặt lịch thành công ! vui lòng xác nhận email để chấp nhận",
        });
        emitter.emit('handleConfirmbooking');
                isShowModal.value = false
        }

    }
    const handleShow = () => {
      isShowModal.value = false

    }
    emitter.on('handleModelBook', (data) => {
            // *Listen* for event
      isShowModal.value = true
      chooseData.value = data
        });
      
    return {
      name,
      email ,
      phone,
      address,
      handleShow ,
      date,
      gender,
      reason,
      isShowModal,
      handleSubmit,
        chooseData,
      idDoctor
          
        };
    },
    components: {
        profileDoctor,
    },
};
</script>

<style></style>
