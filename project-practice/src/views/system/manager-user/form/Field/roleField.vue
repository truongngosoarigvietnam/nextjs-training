<template>
    <div className="w-[24%]">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RoleID</label>
        <select
            @change="$emit('update:modelValue', $event.target.value)"
            v-model="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:ring-blue-500 focus-visible:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
        >
            <option v-for="item in listRole" :key="item.id" :value="item.keyMap">
                {{ local === 'vn' ? item.valueVi : item.valueEn }}
            </option>
        </select>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, render , watch } from 'vue';
import i18n from '@/language/i18n';

export default {
    props: {
        roleId : String
    },
    setup(props , {}) {
        const role = ref('R1');
        watch(() => props.roleId, (pa , pb) => {
            role.value = props.roleId
        })
        const store = useStore();
        const local = computed(() => i18n.global.locale);
        store.dispatch('fetchGender', { type: 'ROLE' });
        const listRole = computed(() => store.state.listRole);
        return {
            listRole,
            role,
            local,
        };
    },
};
</script>

<style></style>
