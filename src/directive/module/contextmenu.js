/* eslint-disable */
export default {
    bind(el, binding, vnode) {
        var GLOBLEsize = 0;
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        let currentSize = GLOBLEsize;
        if (el.style.position == "") {
            el.style.position = "relative";
        }
        el.style.zIndex = "9527";
        /**
         * 增加一个遮罩层方便我控制菜单显示时候取消其余事件
         */
        var Mask = document.createElement("div");
        var Maskstyle = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99997;"
        Mask.style = Maskstyle + "display:none";
        Mask.setAttribute("id", "TT_MASK");
        document.body.appendChild(Mask);
        el.addEventListener("contextmenu", (e) => {
            var e = event || window.event;
            e.stopPropagation();    // 阻止冒泡事件
            e.cancelBubble = true;  // 阻止冒泡事件ie
            e.preventDefault();     // 阻止默认事件 
            // 隐藏所有菜单
            for (let i = 0; i < GLOBLEsize; i++) {
                if (document.getElementById("tt_right_menu" + i)) {
                    document.getElementById("tt_right_menu" + i).style = `display:none`
                }
            }
            var menuX = e.pageX || e.pageY ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;//获取pageX 兼容ie
            var menuY = e.pageX || e.pageY ? e.pageY : e.clientY + document.body.scrollTop - document.body.clientTop;

            document.getElementById("TT_MASK").style = Maskstyle + "display:block";
            if (!document.getElementById("tt_right_menu" + currentSize)) {
                let boxDiv = document.createElement("div");
                binding.value["menus"].map((item) => {
                    let option = document.createElement("div");
                    let iconPosition = "";
                    let icon = "";
                    let content = "";
                    option.setAttribute("unselectable", "on");

                    /**
                     * 兼容用户没有callback的情况
                     */

                    if (item.callback) {
                        option.onclick = vnode.context[item.callback];
                    } else {
                        option.onclick = function () {
                            return false;
                        }
                    }
                    /**
                     * 兼容在展开的选项上右击会出现默认
                     */
                    option.addEventListener("contextmenu", (e) => {
                        var e = event || window.event;
                        e.stopPropagation();    // 阻止冒泡事件
                        e.cancelBubble = true;  // 阻止冒泡事件ie
                        e.preventDefault();     // 阻止默认事件 
                    })
                    if (item.icon) {
                        if (item.iconPosition && (item.iconPosition == "left" || item.iconPosition == "right")) {
                            iconPosition = item.iconPosition
                        } else {
                            iconPosition = "left";
                        }
                        icon = item.icon;
                    }
                    if (item.content) {
                        content = item.content;
                    }

                    if (icon != "") {
                        if (iconPosition == "right") {
                            let img = new Image();
                            img.src = icon;
                            img.style = (item.iconStyle || "") + "vertical-align:middle;";
                            option.innerHTML = content;
                            option.appendChild(img);

                        } else {
                            let img = new Image();
                            img.src = icon;
                            img.style = (item.iconStyle || "") + "vertical-align:middle;";
                            option.appendChild(img);
                            option.innerHTML += content;

                        }
                    } else {
                        option.innerHTML = content;
                    }

                    /**
                     * 兼容屏幕出界的情况；
                     */
                    option.style = `text-align:center;overflow: hidden;text-overflow:ellipsis;white-space:nowrap;margin-block-start: 0em;margin-block-end: 0em;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;${binding.value["optionStyle"] ? binding.value["optionStyle"] : ""};${item["style"] ? item["style"] : ""};`
                    boxDiv.appendChild(option);
                })
                boxDiv.setAttribute("id", "tt_right_menu" + currentSize);
                boxDiv.style = `background:#fff;color:#333;${binding.value["boxStyle"] ? binding.value["boxStyle"] : ""};position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
                document.body.appendChild(boxDiv);
                let divWidth = boxDiv.clientWidth || boxDiv.offsetWidth;

            } else {
                let boxDiv = document.getElementById("tt_right_menu" + currentSize);
                boxDiv.style = `color:#333;background:#fff;${binding.value["boxStyle"] ? binding.value["boxStyle"] : ""};position:fixed;z-index:99999;top:${menuY}px;left:${menuX}px;`
                /**
                     * 判断是否超出屏幕宽度
                     */
                if (menuX + boxDiv.clientWidth >= document.body.clientWidth) {
                    console.warn("超出宽度")
                    boxDiv.style.left = menuX - boxDiv.clientWidth + "px";
                }
                /**
                 * 判断是否超出屏幕高度
                 */
                if (menuY + boxDiv.clientHeight >= document.body.clientHeight) {
                    console.warn(window.screen.height)
                    boxDiv.style.top = menuY - boxDiv.clientHeight + "px";
                }
            }
        })
        GLOBLEsize++;
        document.getElementById("TT_MASK").addEventListener("click", () => {
            if (document.getElementById("tt_right_menu" + currentSize)) {
                document.getElementById("tt_right_menu" + currentSize).style = `display:none`
            }
            document.getElementById("TT_MASK").style = "display:none";
        })
        document.getElementById("TT_MASK").addEventListener("contextmenu", () => {
            if (document.getElementById("tt_right_menu" + currentSize)) {
                document.getElementById("tt_right_menu" + currentSize).style = `display:none`
            }
            document.getElementById("TT_MASK").style = "display:none";
        })

    },
    unbind(el) {
        el.removeEventListener("contextmenu");
    }
}