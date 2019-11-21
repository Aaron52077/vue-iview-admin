/* eslint-disable */
import { off } from '@/utils'

export default {
    bind(el, binding, vnode) {
        const vm = binding.value;
        console.log(vm)
    },
    unbind(el) {
        off(el, 'contextmenu');
        // el.removeEventListener("contextmenu");
    }
}