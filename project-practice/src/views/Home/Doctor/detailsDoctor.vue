<template>
    <div className="h-[500px] pb-[100px]">
        <div className="mx-[10%] flex pt-[50px]">
            <div className="">
                <img className="w-[120px] h-[120px] rounded-[50%] object-cover object-center" :src="listData.image" />
            </div>
            <div className="w-[90%] flex flex-col pl-[45px] pt-[15px]">
                <div className="text-xl font-semibold ">{{ listData.firstName }} {{ listData.lastName }}</div>
                <div className="pt-2">
                    <span>
                        {{ listData.Markdown.description }}
        
                    </span>
                </div>
            </div>
        </div>
        <div className="mx-auto flex px-[10%]  min-h-[200px] max-w-[1440px] mt-[100px]">
            <div className="w-[50%]">
                <DoctorSchedule v-bind:idDoctor="listData.id"  />
                <!-- <DoctorSchedule currentDoctorId={this.state.currentDoctorId}/> -->
            </div>
            <div className="w-[50%]">
                <DoctorExtraInfor v-bind:idDoctor="listData.id" />
                <!-- <DoctorExtraInfo  currentDoctorId={this.state.currentDoctorId}/> -->
            </div>
        </div>     
    </div>
    <div className="bg-[#F9F9F9] pt-[50px] px-[10%]  ">
          <div v-html="convertedMarkdown" className="comment-doctor list-disc"></div>
        </div>
</template>

<script>
import DoctorSchedule from './DoctorSchedule.vue';
import DoctorExtraInfor from './DoctorExtraInfor.vue';
import useDoctor from '@/services/apiDetailDoctor';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { ref, watchEffect } from 'vue';
import profileDoctor from './profileDoctor.vue';
export default {
    setup() {
        const route = useRoute();
        const { getDetailsDoctor } = useDoctor();
    const listData = ref({ Markdown: {
      description: '',
      contentHTML : ''
          }});

        const handleData = async () => {
            const res = await getDetailsDoctor(route.params.id);
            if (res && res.errCode === 0) {
                listData.value = res.data;
            }
        };
        handleData();

        const md = new MarkdownIt();
        const convertedMarkdown = ref(md.render(''));

        watchEffect(() => {
            if (listData.value.Markdown) {
                convertedMarkdown.value = md.render(listData.value.Markdown.contentHTML);
            }
        });

        return {
            listData,
            convertedMarkdown,
        };
    },
    components: {
        DoctorSchedule,
      DoctorExtraInfor,
      profileDoctor
    },
};
</script>

<style>
li {
  list-style-type: disc;
}
</style>
