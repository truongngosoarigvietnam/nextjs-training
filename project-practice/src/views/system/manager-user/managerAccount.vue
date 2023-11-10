<template>
        <main className="user-redux-container">
            <div className="text-center uppercase font-bold text-xl mt-4 text-[#0071ba]">User Redux bi-shop</div>
            <div className="user-redux-body">
                <div className="mx-auto md:max-w-[720px] sm:max-w-[520px] xl:max-w-[1340px]">
                    <div className="flex flex-wrap">
                        <div className="w-full text-lg font-bold dark:text-white">Thêm mới người dùng</div>
                        <router-view />
                        <div className="w-full mb-5">
                            <tableUser />
                        </div>
                    </div>
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
        tableUser,
    }
}
</script>

<style>

</style>