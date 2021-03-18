import { reactive, inject, readonly } from 'vue';

const store = {
    counter: 0
}

export const storeSymbol = Symbol('store');
export const injectStore = () => inject(storeSymbol);
export const provideStore = () => {
    const state = reactive(store);
    const increment = () => state.counter++;

    return { state: readonly(state), increment };
}