import {reactive, computed } from 'vue';

const state = reactive({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: false,
    isBusinessUser: false,
    token: null,
});

// const actions = {
//     login(user) {
//         state.user = user;
//         state.isAuthenticated = true;
//         state.token = user.token;
//     },
//     logout() {
//         state.user = null;
//         state.isAuthenticated = false;
//         state.token = null;
//     },
// };

const actions = {
    setUser(user) {
        state.user = user;
        state.isAuthenticated = !!user;
        state.isBusinessUser = user?.userType === 'business';
        if(user){
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },
    clearUser() {
        state.user = null;
        state.isAuthenticated = false;
        state.isBusinessUser = false;
        localStorage.removeItem('user');
    }
};

const getters = {
    getuser: computed(() => state.user),
    isAuthenticated: computed(() => state.isAuthenticated),
    isBusinessUser: computed(() => state.isBusinessUser),
};

export default {state, actions, getters};