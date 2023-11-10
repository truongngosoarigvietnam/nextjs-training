<template>
    <div className="h-full border-r-[1px] border-solid border-red-500">
        <div className="all-schedule">
            <select v-model="date" class="py-3 text-[#45c3d2] font-semibold underline outline-none" @change="onChange">
                <option class="cursor-pointer" v-for="item in allDays" :key="item.id" :value="item.value">
                    {{ item.label }}
                </option>
            </select>
        </div>
        <div className="">
            <div className="flex items-center">
                <font-awesome-icon class="text-xl mr-1" :icon="['fas', 'calendar-days']" />
                <span class="text-xl"> Lịch khám </span>
            </div>
            <div className="mt-3">
                <div v-if="filteredAppointments">
                    <div className="flex gap-4 flex-wrap">
                        <button
                            @click="handleBtn(item)"
                            v-for="item in filteredAppointments"
                            :key="item.id"
                            :disabled="item.currentNumber == '1'"
                            class="disabled:bg-slate-500 min-w-[120px] px-3 py-[6px] bg-[#fff04b] rounded font-semibold text-[#333] hover:bg-[#45c3d2]"
                        >
                            <p v-if="local === 'vn'">{{ item.timeTypeData.valueVi }}</p>
                            <p v-else>{{ item.timeTypeData.valueVi }} AM</p>
                        </button>
                    </div>
                    <div className="mt-3">
                        <span>
                            chọn <font-awesome-icon :icon="['far', 'hand-point-up']" /> và đặt (Phí đặt lịch 0đ)
                        </span>
                    </div>
                </div>
                <div v-else className="no-schedule">
                    không có lịch hẹn trong thời gian này , vui lòng chọn thời gian khác
                </div>
            </div>
        </div>
    </div>
    <bookingModal :dataDate="date" :chosseDate="chosseDate" :idDoctor="idDoctor" />
</template>

<script>
import i18n from '@/language/i18n';
import moment from 'moment';
import { ref, computed, watch, inject, onMounted } from 'vue';
import useDoctorSchedule from '@/services/apiDoctorSchedule';
import { useRoute } from 'vue-router';
import bookingModal from './bookingModal.vue';

export default {
    props: {
        idDoctor: String,
    },

    setup(props) {
        const idDoctor = ref('');

        watch(
            () => props.idDoctor,
            (pa, pb) => {
                idDoctor.value = pa;
                getData({ doctorId: pa, date: date.value });
            },
        );
        const emitter = inject('emitter');
        emitter.on('handleConfirmbooking', () => {
            getData({ doctorId: idDoctor.value, date: date.value });
        });
        onMounted(() => {
            getData({ doctorId: props.idDoctor, date: date.value });
        });

        const isShowModal = ref(false);
        const local = computed(() => i18n.global.locale);
        const date = ref(moment(new Date()).add(0, 'days').startOf('day').valueOf());
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        const chosseDate = ref('');
        const getArrDays = (language) => {
            let allDays = [];
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (language === 'vn') {
                    if (i === 0) {
                        let DDMM = moment(new Date()).format('DD/MM');
                        let today = `hôm nay-${DDMM}`;
                        object.label = today;
                    } else {
                        let labelVi = (object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                        object.label = capitalizeFirstLetter(labelVi);
                    }
                } else {
                    if (i === 0) {
                        let DDMM = moment(new Date()).format('DD/MM');
                        let today = `Today-${DDMM}`;
                        object.label = today;
                    } else {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                    }
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

                allDays.push(object);
            }
            return allDays;
        };
        const allDays = ref([]);
        const updateDays = () => {
            allDays.value = getArrDays(local.value);
        };
        watch(local, () => {
            updateDays();
        });

        updateDays();

        // /////////////////
        const { fetchScheduleDoctor } = useDoctorSchedule();
        const dataScheduleDoctor = ref([]);
        async function onChange(event) {
            // Do something with the selected value
            getData({ doctorId: idDoctor.value, date: date.value });
        }
        const getData = async ({ doctorId, date }) => {
            const res = await fetchScheduleDoctor({ doctorId: doctorId, date: date });
            if (res && res.infor.errCode === 0) {
                dataScheduleDoctor.value = res.infor.data;
            }
        };
        const currentTime = ref(new Date());

        const filteredAppointments = computed(() => {
            const currentTimeValue = currentTime.value.getTime();
            return dataScheduleDoctor.value.filter((appointment) => {
                const appointmentTime = moment(appointment.timeTypeData.valueVi, 'hh:mm A').toDate();
                return appointmentTime > currentTimeValue;
            });
        });
        const handleBtn = (data) => {
            emitter.emit('handleModelBook', {
                chosseDate: data,
                dataDate: date.value,
            });
        };
        return {
            local,
            allDays,
            isShowModal,
            date,
            onChange,
            dataScheduleDoctor,
            handleBtn,
            chosseDate,
            idDoctor,
            filteredAppointments,
        };
    },
    components: {
        bookingModal,
    },
};
</script>

<style></style>
