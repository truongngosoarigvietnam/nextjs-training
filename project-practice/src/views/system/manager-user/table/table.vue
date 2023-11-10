<template>
    <div v-if="actions">
        <filterBar v-on:handleOption="handleOption" />
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[56vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">FistName</th>
                    <th scope="col" className="px-6 py-3">LastName</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Addrress</th>
                    <th scope="col" className="px-6 py-3">Image</th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in listData"
                    :key="item.id"
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.email }}
                    </th>
                    <td className="px-6 py-4">{{ item.firstName }}</td>
                    <td className="px-6 py-4">{{ item.lastName }}</td>
                    <td className="px-6 py-4">{{ item.roleData.valueVi }}</td>
                    <td className="px-6 py-4">{{ item.address }}</td>
                    <td className="px-6 py-4">
                        <img v-if="item.image" className="h-12 w-12 bg-cover bg-no-repeat bg-center cursor-pointer" :src="item.image" />

                        <img v-else className="h-12 w-12 bg-cover bg-no-repeat bg-center cursor-pointer" :src="imageUrl" />

                    </td>
                    <td className="px-0 py-4 text-right flex gap-2">
                        <button
                            @click="handleEdit(item.id)"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteUser(item.id)"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Delete
                        </button>
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
</template>

<script>
import apiListUser from '@/services/apiListUser';
import { ref, computed, inject, reactive , watch } from 'vue';
import useUser from '@/services/createUser';
import router from '@/router/router';
import filterBar from './filterBar.vue';
import noImg from "@/assets/noImage.webp"
export default {
    props: {
      actions : Boolean  
    },
    setup() {
        const imageUrl = ref(noImg);
        const emitter = inject('emitter');
        const { handleDeleteUser } = useUser();
        const swal = inject('$swal');
        const type = ref('')
        const textSearch = ref('')

        const { listData, errorData, fetchListUser, totalPage } = apiListUser();
        const pageIndex = ref(0);
        fetchListUser({pageIndex : pageIndex.value});
        function nextPage() {
            pageIndex.value = pageIndex.value + 1;
            fetchListUser(
                {
                    pageIndex: pageIndex.value,
                    type: type.value,
                    q : textSearch.value
                });
        }
        function prevPage() {
            pageIndex.value = pageIndex.value - 1;
            fetchListUser(
                {
                    pageIndex: pageIndex.value,
                    type: type.value,
                    q : textSearch.value
                });
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
        function deleteUser(id) {
            swal.fire({
                title: 'Do you want to Delete user ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'DELETE',
                denyButtonText: `Cancel`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res = await handleDeleteUser(id);
                    if (res.errCode === 0) {
                        fetchListUser(pageIndex.value);
                        Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully',
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
        }
        function handleEdit(id) {
            router.push(`/system/manager-account/${id}`);
        }
        function handleOption(option , key) {
                    console.log('call api option' , option , key);
        }
        emitter.on('myevent', (value) => {
            // *Listen* for event
            if (value === 100) {
                fetchListUser({pageIndex : pageIndex.value});
            }
        });
        emitter.on('handleOption', (value) => {
            fetchListUser({
                type : value
            });
            type.value = value
        });
        emitter.on('handleSearch', (value) => {
            fetchListUser({
                type: type.value,
                q : value
            });
            textSearch.value = value
        });
        return {
            listData,
            pageIndex,
            totalPage,
            nextPage,
            prevPage,
            deleteUser,
            handleEdit,
            handleOption,
            imageUrl 
            
        };
    },
    components: {
        filterBar,
    },
};
</script>

<style></style>
