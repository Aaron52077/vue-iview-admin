<template>
    <div class="quillEditor">
        <div v-if="vmObj" v-quillEditorArea="vmObj"></div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'quillEditor',
    props: {
        value: '',
        config: {
            type: [Object],
            default: function () {
                return {}
            }
        },
        height: {
            type: Number,
            default: 360
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    computed: {
        currentValue: {
            get: function() {
                return this.value
            },
            set: function(val) {
                this.$emit('input', val)
            }
        }
    },
    data() {
        return {
            vmObj: this,
            loaded: false
        }
    },
    directives: {
        quillEditorArea: {
            inserted: function(el, binding, vnode) {
                let vm = binding.value;
                vm.dataBase.load('plugins/quill/quill.min.js','plugins/quill/quill.snow.css','plugins/quill/image-resize.min.js','plugins/quill/image-drop.min.js',() => {
                    vm.loaded = true;
                    var defaultConfig = {
                        theme: 'snow',
                        modules: {
                            toolbar: [
                                ['bold', 'italic'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                [{ size: ["small", false, "large", "huge"] }], // 字体大小
                                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                                [{ font: [] }], // 字体种类
                                [{ align: [] }], // 对齐方式
                                ["clean"], // 清除文本格式
                                ['image']
                            ],
                            history: {
                                delay: 1000,
                                maxStack: 50,
                                userOnly: false
                            },
                            imageDrop: true,
                            imageResize: {
                                displayStyles: {
                                    backgroundColor: 'black',
                                    border: 'none',
                                    color: 'white'
                                },
                                modules: ['Resize', 'DisplaySize', 'Toolbar']
                            }
                        }
                    }
                    let config = Object.assign({}, defaultConfig, vm.config);
                    var quill = new window.Quill(el, config);
                    quill.container.style.height = `${vm.height}px`
                    quill.pasteHTML(vm.currentValue);
                    quill.on('text-change', (delta, oldDelta, source) => {
                        vm.$emit('input',vm.$el.children[1].children[0].innerHTML)
                    })
                    vm.$emit('on-init', quill);
                });
            }
        }
    },
}
</script>

<style>
.ql-editor {
    height: 350px;
}
</style>