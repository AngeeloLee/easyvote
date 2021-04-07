import { reactive, inject, readonly } from 'vue';

const store = JSON.parse(sessionStorage.getItem('state')) || {
    counter: 0,
    logined: localStorage.getItem('logined') === 'true',
    username: localStorage.getItem('username') || '',
}

window.onbeforeunload = (e) => {
    sessionStorage.setItem('state', JSON.stringify(store))
}

export const storeSymbol = Symbol('store');
export const injectStore = () => inject(storeSymbol);
export const provideStore = () => {
    const state = reactive(store);
    const methods = {
        logined: (username) => {
            state.logined = true
            state.username = username
            localStorage.setItem('logined', 'true')
            localStorage.setItem('username', username)
        },
        logout: () => {
            state.logined = false
            state.username = ''
            localStorage.setItem('logined', '')
            localStorage.setItem('username', '')
        },
        add: () => {
            state.counter++
        },
    }

    return { state: readonly(state), ...methods };
}