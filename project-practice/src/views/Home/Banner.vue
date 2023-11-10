<template>
   <div className="relative pt-[10px] bg-[url(https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg)] h-[100vh] bg-no-repeat bg-cover bg-center">
            <div className="text-3x items-center text-white drop-shadow-textop mt-56"></div>

            <div className="text-3xl text-center text-white drop-shadow-text">{{$t('homeheader.specialty') }}</div>
            <div className="flex items-center mx-auto w-[400px] justify-center p-2.5 rounded-sm ">
                <FontAwesomeIcon icon={faBars} />
                <input
                    type="text"
                    className="h-8 w-72 bg-transparent outline-none border-none text-xl"
                    placeholder="Tìm kiếm chuyên khoa" />
            </div>
            <ul className="absolute h-[50px] w-[70%] flex items-center text-center mx-auto bg-text bottom-[25%] left-0 right-0">
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.ExaminationSpecialist') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.remoteexamination') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.generalexamination') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.medicaltest') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] "> {{ $t('homeheader.mentalhealth') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.dentalexamination') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.surgerypackage') }}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="mt-[14px] bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.medicalproducts')}}</div>
                </li>
                <li className="h-full w-full flex flex-col items-center ">
                    <div className="bg-white w-[50px] rounded-[50px] h-full flex items-center justify-center  ">
                        <img
                            className="h-[80%]"
                            src="https://cdn.bookingcare.vn/fo/2023/04/12/160542-icon-bai-test-suc-khoe.png"
                            alt=""
                        />
                    </div>
                    <div className="text-base font-bold hover:color-[#A7E4EE] ">{{ $t('homeheader.Healthbusiness') }}</div>
                </li>
            </ul>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>