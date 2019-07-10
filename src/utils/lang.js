/* eslint-disable */
let vm = null;

const VueTranslate = {
    install(Vue) {
        const version = Vue.version[0];
        if (!vm) {
            vm = new Vue({
                data() {
                    return {
                        current: '',
                        locales: {}
                    };
                },
                computed: {
                    lang() {
                        return this.current;
                    },
                    locale() {
                        if (!this.locales[this.current]) return null;
                        return this.locales[this.current];
                    }
                },
                methods: {
                    setLang(val) {
                        if (this.current !== val) {
                            if (this.current === '') {
                                this.$emit('language:init', val);
                            } else {
                                this.$emit('language:changed', val);
                            }
                        }
                        this.current = val;
                        this.$emit('language:modified', val);
                    },
                    setLocales(locales) {
                        if (!locales) return;
                        let newLocale = Object.create(this.locales);
                        for (let key in locales) {
                            if (!newLocale[key]) newLocale[key] = {};
                            Vue.util.extend(newLocale[key], locales[key]);
                        }
                        this.locales = Object.create(newLocale);
                        this.$emit('locales:loaded', locales);
                    },
                    text(t) {
                        if (!this.locale || !this.locale[t]) {
                            return t;
                        }
                        return this.locale[t];
                    },
                    nano(template, data) {
                        return (template || '').replace(/\{([\w\.]*)\}/g, function (str, key) {
                            var keys = key.split("."), v = data[keys.shift()];
                            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
                            return (typeof v !== "undefined" && v !== null) ? v : "";
                        });
                    }
                }
            });
            Vue.prototype.$translate = vm;
        }
        Vue.mixin({
            [version === '1' ? 'init' : 'beforeCreate']() {
                this.$translate.setLocales(this.$options.locales);
            },
            methods: {
                t(t, data) {
                    return this.$translate.nano(this.$translate.text(t), data);
                }
            },
            directives: {
                translate: function (el, binding) {
                    if (!el.$translateKey) el.$translateKey = el.innerText;
                    let data = typeof binding.value == 'object' ? binding.value : {};
                    let text = this.$translate.nano(this.$translate.text(el.$translateKey), data);
                    el.innerText = text;
                }.bind(vm)
            }
        });
        Vue.locales = (locales) => {
            vm.$translate.setLocales(locales);
        };
        Vue.lang = (lang) => {
            vm.$translate.setLang(lang);
        };
    }
};
export default VueTranslate