<template>
    <div className="h-[300px] w-full bg-white cursor-pointer">
            <div className="mx-[170px] flex flex-col">
                <div className="h-[60px] mb-5 pt-5 ">
                    <span className='text-xl font-semibold'>Bác sĩ nổi bật tuần qua</span>
                    <router-link :to="`/doctor`" className="text-black uppercase cursor-pointer float-right px-4 py-3 border-none outline-none block bg-[#ebebeb] text-[#ebebeb] hover:text-white hover:bg-[#f7d800]">
                        tim kiếm
                    </router-link>
                </div>
                <div >
                </div>
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in dataDoctor" :key="item.id">
                        <router-link :to="`/doctor/${item.id}`" className="border border-solid border-[#EEEEEE] w-full m-2">
                            <div className="w-full h-[200px] bg-center bg-cover bg-no-repeat bg-white flex items-center flex-col">
                                <div className="w-full  h-[120px] mt-2.5 flex  justify-center">
                                    <img className='w-[120px] h-[120px] rounded-[50%]' :src="`${item.image}`" />
                                </div>
                                <span className='block text-center'>{{ item.firstName }} {{ item.lastName }}</span>
                            </div>
                        </router-link>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
        </div>
</template>

<script>
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import useDoctor from "@/services/apiTopDoctor"
export default {
    name: 'Outstanding',
    setup() {
        const {dataDoctor , errorData , getTopdoctor} = useDoctor()

        const settings = {
            itemsToShow: 1,
            snapAlign: 'center',
        };
        const breakpoints = {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        };
        getTopdoctor()
        return { settings, breakpoints , dataDoctor };
    },
    components: {
        Carousel,
        Slide,
        Navigation,
    },
};
</script>

<style></style>
jj