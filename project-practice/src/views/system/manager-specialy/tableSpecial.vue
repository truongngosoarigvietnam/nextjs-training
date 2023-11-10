<template>
    <div class="pt-[3%] flex justify-center h-[100px]">
        <div class="flex justify-center w-[30%] gap-x-4">
            <font-awesome-icon
                @click="handleCreate"
                :icon="['fas', 'plus']"
                class="bg-[#0071BA] p-2 rounded-[50%] cursor-pointer text-white hover:text-xl"
            />
            <p class="text-xl font-black text-[#0071BA] mr-[20%]">Tạo thêm</p>
        </div>

        <p class="text-xl font-black text-[#0071BA]">DANH SÁCH CÁC CHUYÊN KHOA</p>
    </div>
    <div class="min-h-[56%] shadow-md mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">STT</th>
                    <th scope="col" className="px-6 py-3">Tên chuyên khoa</th>
                    <th scope="col" className="px-6 py-3">Ngày tạo</th>
                    <th scope="col" className="px-6 py-3">Thumb</th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in listData"
                    @click="handleMount(item.id)"
                    :key="item.id"
                    class="border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    :class="{
                        'bg-[#FAEBD7] hover:bg-[#FAEBD7] ': specialActive === item.id,
                        'bg-white hover:bg-gray-50 dark:hover:bg-gray-600 ': specialActive !== item.id,
                    }"
                >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ index + 1 }}
                    </th>
                    <td className="px-6 py-4">{{ item.name }}</td>
                    <td className="px-6 py-4">{{ formatDate(item.createdAt) }}</td>

                    <td className="px-6 py-4">
                        <img className="h-12 w-12 bg-cover bg-no-repeat bg-center cursor-pointer" :src="item.image" />
                    </td>
                    <td className="px-0 py-4 text-right flex gap-2">
                        <button
                            @click="handleEdit(item)"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteSpecial(item.id)"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Delete
                        </button>
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
    <createSpecial />
    <editSpecialVue />
</template>

<script>
import useSpecial from '@/services/apiListSpecial';
import { format } from 'date-fns';
import { ref, inject } from 'vue';
import createSpecial from './modal/createSpecial.vue';
import useEventSpecial from '@/services/createSpecial';
import editSpecialVue from './modal/editSpecial.vue';
export default {
    setup() {
        const { fetchListSpecial, listData, totalPage } = useSpecial();
        const { handleDeleteSpecial } = useEventSpecial();
        const pageIndex = ref(0);
        const specialActive = ref('');
        const emitter = inject('emitter');
        const swal = inject('$swal');

        const formatDate = (date) => {
            return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        };
        fetchListSpecial({ pageIndex: pageIndex.value });
        function nextPage() {
            pageIndex.value = pageIndex.value + 1;
            fetchListSpecial({
                pageIndex: pageIndex.value,
            });
        }
        function prevPage() {
            pageIndex.value = pageIndex.value - 1;
            fetchListSpecial({
                pageIndex: pageIndex.value,
            });
        }
        const handleCreate = () => {
            emitter.emit('eventShowModalSpecial');
        };
        const handleMount = (id) => {
            specialActive.value = id;

            emitter.emit('eventDoctorBySpecial', id);
        };
        emitter.on('eventHandleSpecial', () => {
            // *Listen* for event
            fetchListSpecial({
                pageIndex: pageIndex.value,
            });
        });
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
        const deleteSpecial = async (id) => {
            swal.fire({
                title: 'Do you want to Delete special ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'DELETE',
                denyButtonText: `Cancel`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res = await handleDeleteSpecial(id);
                    if (res && res.errCode === 0) {
                        fetchListSpecial({
                            pageIndex: pageIndex.value,
                        });
                        Toast.fire({
                            icon: 'success',
                            title: res.errMessage,
                        });
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: res.errMessage,
                        });
                    }
                } else if (result.isDenied) {
                    swal.fire('Changes are not saved', '', 'info');
                }
            });
        };
        function handleEdit(item) {
            emitter.emit('showEditModalSpecial' , item);

        }
        return {
            listData,
            formatDate,
            totalPage,
            pageIndex,
            nextPage,
            prevPage,
            handleMount,
            specialActive,
            handleCreate,
            deleteSpecial,
            handleEdit
        };
    },
    components: {
        createSpecial,
        editSpecialVue
    },
};
</script>

<style></style>
