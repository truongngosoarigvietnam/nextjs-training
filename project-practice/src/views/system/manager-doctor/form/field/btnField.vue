<template>
    <button
        @click="handleEdit"
        v-if="handleBtn"
        :disabled="actions===false"
        className="disabled:opacity-60 bg-orange-400 py-[8px] px-[5px] rounded-md my-[15px] min-w-[75px]"
    >
        Edit
    </button>
    <button
        v-else
        @click="handleSave"
        :disabled="actions === false"
        className="disabled:opacity-60 bg-orange-400 py-[8px] px-[5px] rounded-md my-[15px] min-w-[75px]"
    >
        Save
    </button>
</template>

<script>
import useDoctor from '@/services/doctorActions';
import {inject} from "vue"
export default {
    props: {
        doctor: Object,
        actions: Boolean,
        handleBtn: Boolean,
        doctorId: String,
    },
    setup(props, { }) {
        const swal = inject('$swal');
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

        const { handleEditDoctor, messege } = useDoctor();
        const handleEdit =  async() => {
          const editEvent = await handleEditDoctor({
                action: 'EDIT',
                doctorId: props.doctorId,
                description: props.doctor.description,
                priceId: props.doctor.priceId,
                paymentId: props.doctor.paymentId,
                provinceId: props.doctor.provinceId,
                nameClinic: props.doctor.nameClinic,
                addressClinic: props.doctor.addressClinic,
                note: props.doctor.note,
                specialtyId: props.doctor.specialtyId,
                clinicId: props.doctor.clinicId,
                contentHTML: props.doctor.contentMarkdown,
          });
            if (editEvent && editEvent.errCode === 0) {
                console.log('đã vào đây');
                Toast.fire({
                    icon: 'success',
                    title: 'Edit thành công',
                });
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Edit thất bại',
                });
            }
        };
        const handleSave = async () => {
            const res = await   handleEditDoctor({
                action: 'ADD',
                doctorId: props.doctorId,
                description: props.doctor.description,
                priceId: props.doctor.priceId,
                paymentId: props.doctor.paymentId,
                provinceId: props.doctor.provinceId,
                nameClinic: props.doctor.nameClinic,
                addressClinic: props.doctor.addressClinic,
                note: props.doctor.note,
                specialtyId: props.doctor.specialtyId,
                clinicId: props.doctor.clinicId,
                contentHTML: props.doctor.contentMarkdown,
            });
            if (res && res.errCode === 0) {
                Toast.fire({
                    icon: 'success',
                    title: res.errMessage,
                });
            } else {
                Toast.fire({
                    icon: 'error',
                    title: res.errMessage,
                });
            }
            console.log('check' ,props.doctor.contentMarkdown );
        };
                // event
 
        return {
            handleEdit,
            handleSave
        };
    },
};
</script>

<style></style>
