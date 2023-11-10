<template>
            <main className="user-redux-container">
            <div className="text-center uppercase font-bold text-xl mt-4 text-[#0071ba]">TẠO THÊM THÔNG TIN DOCTOR</div>
            <div className="user-redux-body">
                <div className="mx-auto md:max-w-[920px] sm:max-w-[520px] xl:max-w-[1340px]">
                    <div className="flex flex-wrap">
                        <formDoctor />

                    </div>
                </div>
            </div>

          
        </main>
  
</template>

<script>
import formDoctor from"./form/formDoctor.vue"
export default {
    setup() {
        return {
            
        }
    },
    components: {
        formDoctor
    }
    

}
</script>

<style>

</style>