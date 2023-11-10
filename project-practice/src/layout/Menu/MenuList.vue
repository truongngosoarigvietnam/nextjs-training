<template>
    <div class="flex">
        <div className="bg-transparent flex h-full group relative " v-for="(item, index) in items" :key="index">
            <div
                className=" h-full text-white leading-10 px-[15px] cursor-pointer group-hover:opacity-60 border-r-[1px] border-solid border-[#333]"
            >
                {{ $t(item.title) }}
            </div>
            <ul v-if="item.children"
                className="p-[0px] hidden group-hover:block bg-[#f5f5f5] shadow-submenu text-[#181818] w-max absolute list-none top-[41px] z-50 "
            >
            <li v-for="(data , id) in item.children.data" :key="id" className="px-[15px] w-full  h-[45px] leading-[35px] hover:bg-[#ededed]">
                    <router-link class="w-full h-full block" :to="`${data.to}`"> {{ $t(data.title) }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: [],
        },
    },
    setup(props) {},
};
</script>

<style></style>
