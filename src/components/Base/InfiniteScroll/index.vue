<template>
    <!-- 自定义指令 v-affix 计算容器高度 -->
	<div v-if="vmObj" class="gc-fixed-height" v-affix="vmObj">
		<mScrollbar class="gc-scroll-fixed" :config="config.bar">
            <slot></slot>
        </mScrollbar>
	</div>
</template>

<script>
/* eslint-disable */
import directives from '@/directive/install'

export default {
	data() {
		return {
			vmObj: this
		}
	},
    model: {
        prop: 'value',
        event: 'input'
    },
	props:{
		value: {
			type: [String, Number],
			default: '',
		},
		config: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	computed:{
		currentValue: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
  	directives: {
        affix: {
            inserted: function(el, binding, vnode) {
                const vm = binding.value;
                vm.dataBase.load('jquery', () => {
                    let opt = {
                        offset: 2,
                        base: ['#navTop', '#navBottom'],
                        cls: []
                    }
                opt = $.extend(true,{}, opt, vm.config)
                let cls = opt.base.concat(opt.cls);
                //计算固定区域高度
                var getHeight = function() {
                    if($(el).length){
                        var r = 0;
                        $(cls.join(',')).map(function() {
                            r += $(this).outerHeight(true) || 0;
                        })
                        if(opt.minOffset) {
                            var minH = $(window).height() - r - opt.minOffset;
                            vm.currentValue = minH;
                            $(el).css({ minHeight: minH });
                        }else {
                            var h = $(window).height() - r - opt.offset;
                            vm.currentValue = h;
                            $(el).css({ height:h });
                        }
                    }
                }
                const id = vm.dataBase.uuid();
                vm.dataBase.setData('gc-fixed-height', id);
                $(el).attr('infinite_id', id);
                getHeight();
                setTimeout(() => { 
                    getHeight(); 
                }, 200);
                $(window).off('resize.infinite_id' + id).on('resize.infinite_id' + id, getHeight); // 已id方式注册事件
                });
            },
            unbind: function(el,binding) { 
                // 注销事件
                const vm = binding.value;
                vm.dataBase.load('jquery', () => {
                    const id = vm.dataBase.uuid();
                    $(window).off('resize.infinite_id' + id);
                })
            }
        }
  }
}
</script>

<style scoped>
.gc-fixed-height{
    overflow: auto;
}
</style>
