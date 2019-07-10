/* eslint-disable */

export default {
    bind(el, binding) {
        el.addEventListener('click', e => {
            const customOpts = Object.assign({}, binding.value)
            const opts = Object.assign({
                ele: el, // 波纹作用元素
                type: 'hit', // hit点击位置扩散center中心点扩展
                color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
            }, customOpts)
            const target = opts.ele
            if (target) {
                target.style.position = 'relative'
                target.style.overflow = 'hidden'
                const rect = target.getBoundingClientRect()
                let ripple = target.querySelector('.gc-waves')
                if (!ripple) {
                    ripple = document.createElement('span')
                    ripple.className = 'gc-waves'
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
                    target.appendChild(ripple)
                } else {
                    ripple.className = 'gc-waves'
                }
                switch (opts.type) {
                    case 'center':
                        ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
                        ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
                        break
                    default:
                        ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
                        ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
                }
                ripple.style.backgroundColor = opts.color
                ripple.className = 'gc-waves is-active'
                return false
            }
        }, false)
    }
}