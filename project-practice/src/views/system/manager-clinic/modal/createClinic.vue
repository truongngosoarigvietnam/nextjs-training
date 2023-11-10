<template>
    <div v-show="isShowClinic" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
        <!-- Modal content -->
        <div @click="handleShow" class="relative top-0 left-0 w-full h-full"></div>
        <div
            class="bg-white rounded-lg p-6 max-w-[1440px] w-[50%] overflow-y-auto absolute top-0 left-0 right-0 bottom-0 m-auto h-[90%] py-8"
        >
            <!-- Modal header -->
            <h2 class="text-lg font-bold mb-4 text-center">Tạo thêm Cơ sỡ</h2>
            <!-- Modal body -->
            <form @submit.prevent="handleSave" class="text-start">
                <div class="mb-4 flex gap-x-4 items-center justify-center">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name">
                        Tên cơ sỡ
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        v-model="name"
                        placeholder="Cở sở Đà Nẵng"
                        required
                    />
                </div>
                <div class="mb-4 flex gap-x-4 items-center justify-center">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="name">
                        Địa chỉ
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        v-model="address"
                        placeholder="1191 Ngô Quyền"
                        required
                    />
                </div>
                <div class="mb-4 w-full text-start">
                    <markdown v-model="description" />
                </div>
                <div class="text-start">
                    <imageField v-model="image" @change="previewImage" v-bind:preview="preview" />
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
import markdown from '../../manager-doctor/form/markdown/markdown.vue';
import imageField from '../../manager-user/form/Field/imageField.vue';
import useClinic from '@/services/createClinic';
import { ref, inject } from 'vue';
import {useLoading} from 'vue-loading-overlay'

export default {
    setup() {
        const name = ref('');
        const description = ref('');
        const image = ref('');
        const address = ref('')
        const preview = ref('');
        const isShowClinic = ref(false);
        const swal = inject('$swal');
        const $loading = useLoading({
        // options
        color :'#009B00'
    });
        const { handleCreateClinic } = useClinic();

        function previewImage(event) {
            var input = event.target;
            if (input.files) {
                var input = event.target;
                image.value = event.target.files[0];

                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        preview.value = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }
        function handleShow() {
            isShowClinic.value = !isShowClinic.value;
        }
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
        async function handleSave() {
            const loader = $loading.show({
            // Optional parameters
        });
            const res = await handleCreateClinic({
                name: name.value,
                description: description.value,
                image: image.value,
                address : address.value
            });
            if (res && res.errCode === 0) {
                loader.hide()
                emitter.emit('eventHandleClinic');
                handleShow()
                Toast.fire({
                    icon: 'success',
                    title: "Tạo mới thành công",
        });
            } else {
                loader.hide()

                Toast.fire({
                    icon: 'error',
                    title: "Tạo mới thất bại",
        });
            }
        }
        const emitter = inject('emitter');

        emitter.on('eventShowModalClinic', () => {
            // *Listen* for event
            console.log('checkkk');
            handleShow()
        });
        return {
            description,
            previewImage,
            preview,
            image,
            name,
            address ,
            handleSave,
            handleShow,
            isShowClinic
        };
    },
    components: {
        markdown,
        imageField,
    },
};
</script>

<style></style>
