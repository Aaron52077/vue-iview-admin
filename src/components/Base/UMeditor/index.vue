<template>
    <div v-if="vmObj" v-show="editorReady" class="ueditor_wrap" v-editor-area="vmObj" :id="editorId">
        <div :id="`span_${editorId}`" class="ueditor_img"></div>
        <slot></slot>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        config: {
            type: [Object],
            default: () => {
                return {}
            }
        },
        uploadId: { 
            type: [String,Number],
            default: ''
        }
    },
    data() {
        return {
            fileIns: {},
            vmObj: this,
            editorId: 'editor_ue_01',
            width: '100%',
            height: 200,
            editor: '',
            editorReady: false,
        }
    },
    methods: {
        
    },
    directives: {
        editorArea: {
            inserted: function (el, binding) {
                var vm = binding.value;
                vm.dataBase.load('jquery','umeditor',() => {
                    const cus_toolbar = vm.config.conf && vm.config.conf.toolbars;
                    window.UMEDITOR_CONFIG.toolbar = cus_toolbar ? cus_toolbar[0] :[
                            'undo redo | forecolor backcolor | removeformat ',
                            'insertorderedlist insertunorderedlist' ,
                            '| justifyleft justifycenter justifyright justifyjustify',
                            '| horizontal um_upload'
                    ];
                    window.UM.registerUI('um_upload', function(name) {
                            var $btn = $.eduibutton({
                                icon : name,
                                click : function() {
                                    // 插入图片
                                },
                                title: '图片'
                            });

                            this.addListener('selectionchange', function() {
                                // 切换为不可编辑时，把自己变灰
                                var state = this.queryCommandState(name);
                                $btn.edui().disabled(state == -1).active(state == 1)
                            });
                            return $btn;
                        }
                    );

                    var conf = $.extend({},(vm.config?vm.config.conf:{}));
                    conf.initialFrameWidth = vm.width;
                    conf.initialFrameHeight = vm.height;
                    vm.editor = window.UM.getEditor(vm.editorId, conf);
                    vm.config.init&&vm.config.init(vm.editor,vm);

                    vm.editor.ready(function(editor) {
                        var eDom = $('#'+vm.editorId).parents('.edui-container:first');
                        var eDomBtn = eDom.find('.edui-btn-um_upload');
                        var $upDom = $('#span_'+vm.editorId);
                        $upDom.appendTo(eDomBtn);
                        vm.editorReady = true;
                    });
                    //编辑器内容改变
                    vm.editor.addListener('contentChange', () => {
                        vm.$emit('on-change');
                    });
                });
            }
        }
    }
}
</script>

<style lang="less">
.edui-icon-um_upload {
    background-position: -380px 0;
    position:relative;
    z-index:2;
}

.edui-editor-body .edui-body-container{
    ol{
        list-style:decimal  inside;
    }
    ul{
        list-style:square inside;
    }
}
.ueditor_img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 20px;
    height: 20px;
    overflow: hidden;
    z-index: 9;
    cursor: default;
}
</style>
