import { createStore } from 'vuex';
import i18n from '@/language/i18n';
import useAllcode from '@/services/allCodeService';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 0,
            profile: {},
            listGender: [],
            listRole: [],
            listPosition: [],
            menuItems: [
                
            ]
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        SET_LANG(state, payload) {
            i18n.global.locale = payload;
        },
        SET_PROFILE(state, payload) {
            state.profile = payload;
        },
        SET_GENDER(state, payload) {
            state.listGender = payload;
        },
        SET_ROLE(state, payload) {
            state.listRole = payload;
        },
        SET_POSITION(state, payload) {
            state.listPosition = payload;
        },
    },
    actions: {
        setLang({ commit }, payload) {
            commit('SET_LANG', payload);
        },

        fetchLogin({ commit }, payload) {
            commit('SET_PROFILE', payload);
        },
        async fetchGender({ commit }, { type }) {
            const { dataAllcode, errorAllcode, fetchAllcode } = useAllcode();
            fetchAllcode(type);
            if (type === 'GENDER') {
                commit('SET_GENDER', dataAllcode);
            } else if (type === 'ROLE') {
                commit('SET_ROLE', dataAllcode);
            } else {
                commit('SET_POSITION', dataAllcode);
            }
        },
    },
});
export default store;
