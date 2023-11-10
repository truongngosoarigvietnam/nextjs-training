<template>
    <div class="container">
        <div class="wrapper ml-20 mt-20">
            <div class="header mb-10">
                <h1 class="header-title text-3xl font-bold">Bài Viết Nổi Bật</h1>
                <p class="mt-5">
                    Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
                </p>
            </div>

            <div v-for="item in listData" :key="item.id" class="comments-wrapper border-solid border-2 border-[#e8e8e8] rounded-xl mb-5">
                <router-link :to="`/handbook/${item.id}`" class="comment p-10 cursor-pointer block">
                    <div class="comment-user-info flex justify-between mb-5">
                        <div class="left flex">
                            <img class="rounded-full h-6 min-w-[50px] min-h-[50px]" :src="item.User.image" alt="" />
                            <h3 class="font-semibold name ml-2">{{ item.User.lastName }} {{ item.User.firstName }}</h3>
                        </div>
                        <div class="right">
                            <i class="px-2 py-1 fa-regular fa-bookmark"></i>
                            <i class="px-2 py-1 fa-sharp fa-solid fa-ellipsis"></i>
                        </div>
                    </div>

                    <div class="comment-content flex justify-between gap-x-5">
                        <div class="w-full">
                            <h1 class="header-title text-2xl font-bold">{{ item.title }}</h1>
                            <p class="mt-2 line-clamp-2">
                               {{ item.content }}
                            </p>
                        </div>
                        <div class="w-[20%]">
                            <img class="rounded-xl w-[200px] h-[120px]" :src="item.thumb" alt="" />
                        </div>
                    </div>
                </router-link>
            </div>

         
        </div>
    </div>
</template>

<script>
import useHandBook from "@/services/apiListBlog"

export default {

    setup() {
        const {errorData , fetchListBlog , listData} = useHandBook()

        fetchListBlog({pageIndex : 0})
        return {
            listData
        }
    }
};
</script>

<style></style>
