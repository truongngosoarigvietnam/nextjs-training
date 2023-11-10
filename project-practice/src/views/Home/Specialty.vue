<template>
    <div className="h-72 w-full bg-white ">
        <div className="mx-44 flex  flex-col ">
            <div className="h-[60px] mb-5 pt-5 ">
                <span className="text-xl font-semibold">{{ $t('homeheader.popular-specialty') }}</span>
                <button
                    className="text-black uppercase cursor-pointer float-right px-4 py-3 border-none outline-none block bg-[#ebebeb] text-[#ebebeb] hover:text-white hover:bg-[#f7d800]"
                >
                {{ $t('button.more') }}
                </button>
            </div>
            <div className="text-red-500" >
                <!-- <div  v-for="( slide , index) in slides" :key="index">
                  
                     <div>{{ slide.name }}</div> 
                </div> -->
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in listData" :key="item.id">
                        <router-link :to="`/doctor/${item.id}`">
                        <div>
                            <div
                        :class="`w-[200px] h-[150px] bg-cover  bg-center bg-no-repeat`"
                        :style="`background-image : url(${item.image})`"

                    ></div>
                     <div>{{ item.name }}</div> 
                        </div>
                    </router-link>
                    </Slide>

                    <template >
                        <Navigation   />
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import anh1 from "@/assets/anh1.png";
import useSpcialy from "@/services/apiListSpecial"
export default {
    name: 'specialty',
    setup() {
        const settings = {
            itemsToShow: 3,
            snapAlign: 'center',
        };
        const {errorData , fetchListSpecial , listData} = useSpcialy()
        const breakpoints = {
            // 700px and up
            700: {
                itemsToShow: 2,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        };
        fetchListSpecial({pageIndex : '0' , size : '5'})

        return {  settings, breakpoints , listData  };
    },
    components: {
        Carousel,
        Slide,
        Navigation,
        
    },
};
</script>

<style></style>
