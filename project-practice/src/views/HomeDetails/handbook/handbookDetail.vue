<template>
    <div v-if="dataDetail">

        <div :key="routeName" class="bg-[#F6F6F6] px-[10%] flex items-center cursor-pointer">
            <font-awesome-icon :icon="['fas', 'house']" @click="handleHome" />
            <p v-if="dataDetail" class="text-[#45C3D5]">/ Cẩm nang / {{ dataDetail.topic }}</p>
        </div>
        <div class="px-[10%]">
            <h1  class="text-3xl font-bold my-4 text-[#333]">{{ dataDetail.title }}</h1>
            <div>Sản phẩm của <span class="text-[#45C3D5]">BookingCare</span></div>
            <div>
                Tác giả <span class="text-[#45C3D5]">{{ dataDetail.User.firstName }} {{ dataDetail.User.lastName }}</span>
            </div>
            <div>
                Xuất bản : <span class="">{{ formatDate(dataDetail.createdAt) }}</span> , Cập nhật lần cuối :
                {{ formatDate(dataDetail.updatedAt) }}
            </div>
        </div>
        <div class="bg-[#FCFAF6] px-[10%] mx-[10%] mt-20">
            {{ dataDetail.content }}
        </div>
    </div>
</template>

<script>
import useBlog from '@/services/apiDetailBlog';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import router from '@/router/router';
import {watch} from "vue"

export default {
    setup() {
        const { dataDetail, fetchDetailBlog } = useBlog();
        const route = useRoute();
        const routeName = route.name;
        fetchDetailBlog(route.params.id);
        const formatDate = (date) => {
            return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
        };
        const handleHome = () => {
            window.history.back();
        };
        watch(
            () => route,
            (to, from) => {
                // Cập nhật giao diện
                console.log('watch callback triggered');

            },
        );
        return {
            dataDetail,
            formatDate,
            handleHome,
            routeName,
        };
    },
};
</script>

<style></style>
