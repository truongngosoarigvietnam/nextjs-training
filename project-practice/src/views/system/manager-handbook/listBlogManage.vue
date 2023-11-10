<template>
    <div class="bg-[#F1FCF2] px-[3%] h-[100vh]">
        <div class="pt-[3%]">
            <p class="text-xl font-black text-[#0071BA]">DANH SÁCH CÁC BLOG</p>
        </div>
        <handbookBarVue />
        <div class="min-h-[56%]  shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tiêu đề</th>
                        <th scope="col" className="px-6 py-3">Người viết</th>
                        <th scope="col" className="px-6 py-3">Ngày tạo</th>
                        <th scope="col" className="px-6 py-3">Thumb</th>
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
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {{ item.title }}
                        </th>
                        <td className="px-6 py-4">{{ item.User.firstName }} {{ item.User.lastName }}</td>
                        <td className="px-6 py-4">{{ formatDate(item.createdAt) }}</td>

                        <td className="px-6 py-4">
                            <img
                                className="h-12 w-12 bg-cover bg-no-repeat bg-center cursor-pointer"
                                :src="item.thumb"
                            />
                        </td>
                        <td className="px-0 py-4 text-right flex gap-2">
                            <button
                                @click="handleEdit(item.id)"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                @click="handleDeleteBlog(item.id)"
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
    </div>
</template>

<script>
import useBlog from '@/services/apiListBlog';
import useActionBlog from "@/services/apiBlogs"
import { format } from 'date-fns';
import {ref , inject} from "vue"
import handbookBarVue from './handbookBar.vue';
import router from '@/router/router';

export default {
    setup() {
        const { errorData, fetchListBlog, listData , totalPage } = useBlog();
        const {deleteBlog , messege} = useActionBlog()
        const now = new Date('2023-05-05T08:21:46.000Z');
        console.log('check ', now);
        const pageIndex = ref(0);
        const emitter = inject('emitter');
        const textSearch = ref('')
        const swal = inject('$swal');
        fetchListBlog({pageIndex : pageIndex.value});
        const formatDate = (date) => {
            return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        };
        function nextPage() {
            pageIndex.value = pageIndex.value + 1;
            fetchListBlog(
                {   q : textSearch.value ,
                    pageIndex: pageIndex.value,
                });
        }
        function prevPage() {
            pageIndex.value = pageIndex.value - 1;
            fetchListBlog(
                {   q : textSearch.value ,
                    pageIndex: pageIndex.value,
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
        function handleDeleteBlog(id) {
            swal.fire({
                title: 'Do you want to Delete Blog ?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'DELETE',
                denyButtonText: `Cancel`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const res = await deleteBlog(id);
                    if (res.errCode === 0) {
                        fetchListBlog({
                            q : textSearch.value ,
                            pageIndex: pageIndex.value
                        });

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
        const handleEdit = (id) => {
            router.push(`/system/manager-handbook/create-handbook/${id}`)
        }
        emitter.on('handleSearchBlog', (value) => {
            fetchListBlog({
                q : value
            });
            textSearch.value = value
        });
        return {
            listData,
            formatDate,totalPage ,pageIndex , nextPage , prevPage , handleDeleteBlog , handleEdit
        };
    },
    components: {
        handbookBarVue
    }
};
</script>

<style></style>
