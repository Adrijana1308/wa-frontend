import {createStore } from 'vuex';
import { Auth } from '@/Services';

const store = createStore({
    state:{
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'),
        isBusinessUser: JSON.parse(localStorage.getItem('user'))?.userType === 'business' || false,
        token: null,
    },

    mutations: {
        setUser(state, user) {
            console.log('Setting user in vuex: U STATE.JSU SAM...', user)
            state.user = user;
            state.isAuthenticated = !!user;
            state.isBusinessUser = user?.userType === 'business';
            if(user){
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isBusinessUser = false;
            localStorage.removeItem('user');
        },
    },
    actions: {
        async login({ commit }, {email, password }){
            try{
                const success = await Auth.login(email, password);
                if(success){
                    const user = Auth.getUser();
                    commit('setUser', user);
                    return true;
                }
            } catch (error){
                console.error('Login failed: ', error);
                return false;
            }
        },
        clearUser({ commit }) {
          commit('clearUser');
        },
    },

    getters: {
        getuser: (state) => state.user,
        isAuthenticated: (state) => state.isAuthenticated,
        isBusinessUser: (state) => state.isBusinessUser,
        currentUserId: (state) => state.user?._id || null,
    },
});

export default store;