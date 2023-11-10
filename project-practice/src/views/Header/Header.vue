<template>
    <div class=" xl:h-[60px] bg-white-400 ">
                <div class="w-full h-full flex  px-[20px]">
                    <div class="flex w-1/4 items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'bars']" class="text-3xl text-gray-400 cursor-pointer mr-3" />

                        <img
                            class="h-full"
                            src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1678091386/booking-care/logo1_jfb7hu.jpg"
                            alt=""
                        />
                    </div>
                    <div class="w-1/2 flex justify-between items-center">
                        <div class="child-content">
                            <div>
                               
                                <b>{{ $t('homeheader.Specialist') }}</b>
                            </div>
                            <div class="font-normal text-xs"> {{ $t('homeheader.specialty') }}</div>
                        </div>
                        <div class="child-content">
                            <div>
                               
                                <b> {{ $t('homeheader.Health') }}</b>
                            </div>
                            <div class="font-normal text-xs">{{ $t('homeheader.hospital') }}</div>
                        </div>
                        <div class="child-content">
                            <div>
                               
                                <b>{{ $t('homeheader.doctor') }}</b>
                            </div>
                            <div class="font-normal text-xs">{{  $t('homeheader.Choosedoctor') }}</div>
                        </div>
                        <div class="child-content">
                            <div>
                               
                                <b>{{ $t('homeheader.package')}}</b>
                            </div>
                            <div class="font-normal text-xs">{{ $t('homeheader.Generalcheck')}}</div>
                        </div>
                    </div>
                    <div class="w-1/4 flex items-center justify-center ">
                        <div class="text-xl p-1 cursor-pointer">
                            <font-awesome-icon :icon="['far', 'circle-question']" />
                        </div>
                       {{ $t('homeheader.Support') }}

                        <div class="w-60px p-1 flex items-center justify-center gap-2 ml-2">
                            <span  
                            :class="{ 'text-red-700 cursor-pointer': local==='vn' }"
                            class="cursor-pointer">
                                
                                <!-- class={i18n.language === 'vi' ? ' text-red-700 cursor-pointer' : 'cursor-pointer'} -->
                                <!-- onClick={() => changeLanguage('vi')} -->
                            
                                <span value="vn"  @click.prevent="callSetLangActions('vn')" >VN</span>
                            </span>
                            <span
                            class="cursor-pointer"
                            :class="{ 'text-red-700 cursor-pointer': local==='en' }"                
                            >
                                <span value="en" @click.prevent="callSetLangActions('en')">EN</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
import {useStore} from "vuex"
import i18n from "@/language/i18n"
import {computed} from"vue"
export default {
    name: "header",
    setup() {
      const local = computed(()=> i18n.global.locale)
        const store = useStore();

       function callSetLangActions(lang){
         store.dispatch("setLang", lang)
        console.log('check' , lang);
        }

        return {
            callSetLangActions,
            local
        }
    }

}
</script>

<style>

</style>