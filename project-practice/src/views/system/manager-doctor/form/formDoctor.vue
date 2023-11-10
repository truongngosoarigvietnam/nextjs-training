<template>
    <div className="w-full flex flex-wrap gap-y-5 mt-3" >
        <doctorField v-model="doctorId" v-bind:doctorId="doctor.id" />
        <infomationFieldVue v-model="doctor.description" v-bind:description="doctor.description" />
        <priceField v-model="doctor.priceId" v-bind:priceId="doctor.priceId" />
        <paymentFieldVue v-model="doctor.paymentId" v-bind:paymentId="doctor.paymentId" />
        <provinceField v-model="doctor.provinceId" v-bind:provinceId="doctor.provinceId" />
        <nameClinicFieldVue v-model="doctor.nameClinic" v-bind:nameClinic="doctor.nameClinic" />
        <addressClinicFieldVue v-model="doctor.addressClinic" v-bind:addressClinic="doctor.addressClinic" />
        <noteField v-model="doctor.note" v-bind:note="doctor.note" />
        <specialistField v-model="doctor.specialtyId" v-bind:specialtyId="doctor.specialtyId" />

        <clinicListFieldVue v-model="doctor.clinicId" v-bind:clinicId="doctor.clinicId" />
        <div className="w-full">
            <markdown v-model="doctor.contentMarkdown" />
        </div>
        <div className="w-full">
          
            <btnFieldVue v-bind:doctor="doctor" v-bind:actions="actions" v-bind:handleBtn="handleBtn" v-bind:doctorId="doctorId" />
        </div>
    </div>
</template>

<script>
import addressClinicFieldVue from './field/addressClinicField.vue';
import doctorField from './field/doctorField.vue';
import infomationFieldVue from './field/infomationField.vue';
import nameClinicFieldVue from './field/nameClinicField.vue';
import paymentFieldVue from './field/paymentField.vue';
import priceField from './field/priceField.vue';
import provinceField from './field/provinceField.vue';
import noteField from './field/noteField.vue';
import specialistField from './field/specialistField.vue';
import clinicListFieldVue from './field/clinicListField.vue';
import markdown from './markdown/markdown.vue';
import { ref, watch, reactive , inject } from 'vue';
import MarkdownIt from 'markdown-it';
import useDetailsDoctor from '@/services/apiDetailDoctor';
import btnFieldVue from './field/btnField.vue';
export default {
    setup() {

        const doctor = ref({
            id: '',
            description: '',
            priceId: '',
            paymentId: '',
            provinceId: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: '',
            contentMarkdown: '',
        });
        const actions= ref(true)
        const doctorId = ref('');
        const markdown2 = ref('');
        const handleBtn = ref(false)
        const html = ref('');
        const { listData, errorData, getDetailsDoctor } = useDetailsDoctor();
        const onInput = (value) => {
            const md = new MarkdownIt();
            html.value = md.render(value);
            doctor.value.contentMarkdown = value;
        };
        watch(doctorId, async (pa, pb) => {
            const res = await getDetailsDoctor(pa);


            if (res.errCode === 0) {
                if (res.data.doctorInfor) {
                    doctor.value = Object.assign({}, doctor.value, {
                        id: res.data.id,
                        description: res.data.Markdown.description,
                        priceId: res.data.doctorInfor.priceId,
                        paymentId: res.data.doctorInfor.paymentId,
                        provinceId: res.data.doctorInfor.provinceId,
                        nameClinic: res.data.doctorInfor.nameClinic,
                        addressClinic: res.data.doctorInfor.addressClinic,
                        note: res.data.doctorInfor.note,
                        specialtyId: res.data.doctorInfor.specialtyId,
                        clinicId: res.data.doctorInfor.clinicId,
                        contentMarkdown: res.data.Markdown.contentHTML,
                    });
                    actions.value = false
                    handleBtn.value = true
                } else {
                    doctor.value = {
                        id: '',
                        description: '',
                        priceId: '',
                        paymentId: '',
                        provinceId: '',
                        nameClinic: '',
                        addressClinic: '',
                        note: '',
                        specialtyId: '',
                        clinicId: '',
                        contentMarkdown: '',
                    };
                    handleBtn.value = false
                }
            }
        });


        return {
            markdown2,
            html,
            onInput,
            doctor,
            doctorId,
            actions,
            handleBtn
            
        };
    },
    components: {
        doctorField,
        infomationFieldVue,
        priceField,
        paymentFieldVue,
        provinceField,
        nameClinicFieldVue,
        addressClinicFieldVue,
        noteField,
        specialistField,
        clinicListFieldVue,
        markdown,
        btnFieldVue
    },
};
</script>

<style></style>
