<template>
      <div className="h-80 w-full bg-[#F5F5F5]">
            <div className="mx-44 flex  flex-col ">
            <div class="h-[60px] mb-5 pt-5 ">
                    <span class="text-xl font-semibold">Cẩm nang</span>
                    <button @click="handleMore" class="text-black uppercase cursor-pointer float-right px-4 py-3 border-none outline-none block bg-[#ebebeb] text-[#ebebeb] hover:text-white hover:bg-[#f7d800]">
                        Tất cả bài viết
                    </button>
                </div>
            <div class="text-red-500">
                <!-- <div  v-for="( slide , index) in slides" :key="index">
                  
                     <div>{{ slide.name }}</div> 
                </div> -->
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in listData" :key="item.id">
                            <router-link :to="`/handbook/${item.id}`" class="flex flex-row gap-5 w-full ">
                                <div
                                    class="`basis-1/2 w-[50%] h-[200px] bg-cover bg-white bg-center bg-no-repeat`"
                                    :style="`background-image : url(${item.thumb})`"

                                ></div>
                                <div class="basis-1/2 ">
                                    <h3>{{ item.title }}</h3>
                                </div>                    
                        </router-link>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import useHandBook from "@/services/apiListBlog"
import router from '@/router/router';
import 'vue3-carousel/dist/carousel.css';
export default {
    name: 'Handbook',
    setup() {
        const {errorData , fetchListBlog , listData} = useHandBook()
        const settings = {
            itemsToShow: 1,
            snapAlign: 'center',
        };
        const breakpoints = {
            // 700px and up
            700: {
                itemsToShow: 2,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 2,
                snapAlign: 'start',
            },
        };
        fetchListBlog({ pageIndex: 0 })
        const handleMore = () => {
            router.push('/handbook')
        }
        return { listData, settings, breakpoints , handleMore };
    },
    components: {
        Carousel,
        Slide,
        Navigation,
    },
};
</script>

<style></style>
