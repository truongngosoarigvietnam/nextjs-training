<template>
    <div class="h-[70px] bg-[#45C3D2] text-white">
        <div class="flex items-center shadow-lg h-full gap-x-2 px-[5%]">
            <font-awesome-icon :icon="['fass', 'arrow-left']" class="text-2xl cursor-pointer" />
            <p class="text-2xl">Chuyên khoa</p>
        </div>
    </div>
    <main>
        <div
            class="bg-[url(https://cdn.bookingcare.vn/fo/2019/12/13/120331-co-xuong-khop.jpg)] relative object-cover object-center w-full max-h-[500px]"
        >
        <div class="absolute bg-white bg-opacity-70 top-0 left-0 w-full h-full">

             </div>
            <div class="px-[10%] relative z-50 ">
                <h2 class="text-xl font-bold">Cơ xương khớp</h2>
                <div>
                    Bác sĩ Cơ Xương Khớp giỏi Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam: Các
                    chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm Các giáo sư, phó giáo sư đang trực tiếp
                    nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội Các bác sĩ đã, đang công tác tại các bệnh viện
                    hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E. Là thành
                    viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,... Được
                    nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,... Bệnh Cơ
                    Xương Khớp Gout Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ Viêm khớp dạng thấp, Viêm
                    đa khớp, Viêm gân Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai
                    Loãng xương, đau nhức xương Viêm xương, gai xương Viêm cơ, Teo cơ, chứng đau mỏi cơ Yếu cơ, Loạn
                    dưỡng cơ Các chấn thương về cơ, xương, khớp
                </div>
            </div>
        </div>
        <div class="bg-[#EEEEEE] px-[10%] flex">
            <div>
                 </div>
                 <div>
                    <DoctorSchedule />
                    <DoctorExtraInforVue />
                     </div>

             </div>
    </main>
</template>

<script>
import DoctorExtraInforVue from '@/views/Home/Doctor/DoctorExtraInfor.vue';
import DoctorSchedule from '@/views/Home/Doctor/DoctorSchedule.vue';
export default {
    setup() {

        return {

        }
    },
    components: {
        DoctorExtraInforVue,
        DoctorSchedule
    }
};
</script>

<style></style>
