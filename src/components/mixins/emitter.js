/**
 * https://github.com/view-design/ViewUI/blob/master/src/mixins/emitter.js
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // todo 如果 params 是空数组，接收到的会是 undefined
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

export default {
    methods: {
        /**
         * @description 递归遍历当前组件下面所有与组件名称相匹配的组件，并触发目标事件并传参
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        broadcast(componentName, eventName, params = []) {
            broadcast.call(this, componentName, eventName, params);
        },
        /**
         * @description 逆向递归寻找当前组件的父组件，然后emit事件并传递参数
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        dispatch(componentName, eventName, params = []) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        }
    }
}