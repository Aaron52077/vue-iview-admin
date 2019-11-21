/**
 * https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js
 */
export default {
    methods: {
        /**
         * @description 递归遍历当前组件下面所有与组件名称相匹配的组件，并触发目标事件并传参
         * @param {Component} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        broadcast(target, componentName, eventName, params = []) {
            let _this = this
            target.forEach(child => {
                let name = child.$options.componentName
                if (name === componentName) {
                    child.$emit.apply(child, [eventName, ...params])
                } else {
                    _this.broadcast(child.$children, componentName, eventName, params)
                }
            })
        },
        /**
         * @description 逆向递归寻找当前组件的父组件，然后emit事件并传递参数
         * @param {Component} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        dispatch(target, componentName, eventName, params = []) {
            let name
            if (!(name = target.$options.componentName)) return
            if (name === componentName) {
                target.$emit.apply(target, [eventName, ...params])
            } else {
                this.dispatch(target.$parent, componentName, eventName, params)
            }
        }
    }
}