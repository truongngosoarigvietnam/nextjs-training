<template>
    <main className="bg-[#F1FCF2] h-[100vh]">
        <div className="text-center uppercase font-bold text-xl text-[#0071ba]">Quản lí người dùng</div>
        <div className="user-redux-body">
            <div className="mx-auto md:max-w-[720px] sm:max-w-[520px] xl:max-w-[1340px]">
                <tableUser :actions="true" />
            </div>
        </div>

      
    </main>
</template>

<script>
import tableUser from "./table/table.vue";
export default {
    setup() {
        
    },
    components: {
        tableUser
    }
}  
</script>

<style>

</style>