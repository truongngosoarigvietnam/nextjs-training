<template>
    <div v-show="isShow" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
        <!-- Modal content -->
        <div @click="handleShow" class="relative top-0 left-0 w-full h-full"></div>
        <div
            class="bg-white rounded-lg p-6 max-w-[1440px] w-[50%] overflow-y-auto absolute top-0 left-0 right-0 bottom-0 m-auto h-[90%] py-8"
        >
            <!-- Modal header -->
            <h2 class="text-lg font-bold mb-4 text-center">Gửi hóa đơn khám bệnh</h2>
            <!-- Modal body -->
            <form @submit.prevent="handleSave" class="text-start">
                <div class="mb-4 flex gap-x-4 items-center justify-center">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name">
                        Email bệnh nhân
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        v-model="email"
                        required
                    />
                </div>
                <div class="mb-4 flex gap-x-4 items-center justify-center">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files"
                        >Chọn file đơn thuốc</label
                    >
                    <input
                        @change="previewImage"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="multiple_files"
                        type="file"
                        multiple
                    />
                </div>

                <div class="text-end">
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, inject } from 'vue';
import { is } from 'date-fns/locale';
import usePatient from '@/services/apiPatient';
import { useLoading } from 'vue-loading-overlay';

export default {
    props: {},
    setup() {
        const email = ref('');
        const file = ref('');
        const isShow = ref(false);
        const emitter = inject('emitter');
        const doctorId = ref('');
        const date = ref('');
        const timeType = ref('');
        const patientId = ref('');
        const image = ref('');
        const patientName = ref('');
        const { confirmPatient } = usePatient();
        function previewImage(event) {
            var input = event.target;
            image.value = event.target.files[0];

            if (input.files) {
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        file.value = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }

        function handleShow() {
            isShow.value = !isShow.value;
        }
        emitter.on('eventShowModalConfirm', (data) => {
            // *Listen* for event
            email.value = data.patientData.email;
            doctorId.value = data.doctorId;
            timeType.value = data.timeType;
            patientId.value = data.patientId;
            patientName.value = data.patientData.firstName;
            date.value = data.date;
            handleShow();
        });
        const $loading = useLoading({
            // options
            color: '#009B00',
        });
        const swal = inject('$swal');
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
        const handleSave = async () => {
            const loader = $loading.show({
                // Optional parameters
            });
            const res = await confirmPatient({
                email: email.value,
                doctorId: doctorId.value,
                patientId: patientId.value,
                timeType: timeType.value,
                imageBase64: file.value,
                patientName: patientName.value,
                image: image.value,
                date: date.value,
            });
            if (res.errCode !== 0) {
                loader.hide();

                Toast.fire({
                    icon: 'error',
                    title: res.errMessage,
                });
            } else {
                loader.hide();
                Toast.fire({
                    icon: 'success',
                    title: res.errMessage,
                });
                handleShow();
                emitter.emit('handleListPatient', 100);
            }
        };

        return {
            email,
            isShow,
            handleShow,
            previewImage,
            file,
            handleSave,
        };
    },
};
</script>

<style></style>
