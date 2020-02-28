<template>
    <div id="tags-view-container" class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                v-for="tag in visitedViews"
                ref="tag"
                :key="tag.path"
                :class="isActive(tag) ? 'is-active' : ''"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                class="tags-view-item"
                @click.native="onClick(tag.meta.title)"
                @contextmenu.prevent.native="openMenu(tag, $event)">
                {{tag.meta.title}}
                <sIcon v-if="!tag.meta.affix" type="ios-close-circle-outline" :size="16" @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </scroll-pane>
        <!-- 右键操作项 -->
        <ul v-show="visible" :style="{left: `${left}px`, top: `${top}px`}" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!(selectedTag.meta && selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script>
import scrollPane from './scrollPane.vue'
import path from 'path'

export default {
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            affixTags: []
        }
    },
    components: { scrollPane },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews
        },
        routes() {
            return this.$store.state.permission.routes
        }
    },
    watch: {
        $route() {
            this.addTags()
            this.moveToCurrentTag()
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
        isActive(route) {
            return route.path === this.$route.path
        },
        filterAffixTags(routes, basePath = '/') {
            let tags = []
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                const tagPath = path.resolve(basePath, route.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    })
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path)
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        },
        initTags() {
            const affixTags = this.affixTags = this.filterAffixTags(this.routes)
            for (const tag of affixTags) {
                // Must have tag name
                if (tag.name) {
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        },
        onClick(title) {
            if (!title) return false 
            this.$store.dispatch('app/setNavbar', title)
        },
        addTags() {
            const { name } = this.$route
            if (name) {
                this.$store.dispatch('tagsView/addView', this.$route)
            }
            return false
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        // when query is different then update
                        if (tag.to.fullPath !== this.$router.fullPath) {
                            this.$store.dispatch('tagsView/updateVisitedView', this.$route)
                        }
                        break
                    }
                }
            })
        },
        refreshSelectedTag(view) {
            this.$store.dispatch('tagsView/delCachedView', view).then(() => {
                const { fullPath } = view
                this.$nextTick(() => {
                    this.$router.replace({ path: '/redirect' + fullPath })
                })
            })
        },
        closeSelectedTag(view) {
            this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
                if (this.isActive(view)) {
                    this.toLastView(visitedViews, view)
                }
            })
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag)
            this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
                this.moveToCurrentTag()
            })
        },
        closeAllTags(view) {
            this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
                if (this.affixTags.some(tag => tag.path === view.path)) {
                    return
                }
                this.toLastView(visitedViews, view)
            })
        },
        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView)
            } else {
                // now the default is to redirect to the home page if there is no tags-view,
                // you can adjust it according to your needs.
                if (view.name === 'dashboard') {
                    // to reload home page
                    this.$router.replace({ path: '/redirect' + view.fullPath })
                } else {
                    this.$router.push('/')
                }
            }
        },
        openMenu(tag, e) {
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
            const offsetWidth = this.$el.offsetWidth // container width
            const maxLeft = offsetWidth - menuMinWidth // left boundary
            const left = e.clientX - offsetLeft + 15 // 15: margin right
            if (left > maxLeft) {
                this.left = maxLeft
            } else {
                this.left = left
            }
            this.top = e.clientY - 60 // 60 topnav height
            this.visible = true
            this.selectedTag = tag
        },
        closeMenu() {
            this.visible = false
        }
    }
}
</script>

<style lang="less">
.tags-view-container {
    position: relative;
    padding-top: 5px;
    height: 40px;
    width: 100%;
    z-index: 11;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: 0 0;
        pointer-events: none;
        border: 0 solid #cfd7e5;
        border-bottom-width: 2px; 
        right: 0;
        z-index: -1;
    }
    .tags-view-wrapper {
        overflow: hidden;
        margin-bottom: -1px;
        position: relative;
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 35px;
            line-height: 35px;
            color: #606266;
            padding: 0 20px;
            font-size: 14px;
            margin-right: 5px;
            border: 1px solid #cfd7e5;
            border-bottom-color: transparent;
            background-color: hsla(0, 0%, 100%, .5);
            border-radius: 4px 4px 0 0;
            transition: color .3s cubic-bezier(.645, .045, .355, 1);
            &:first-of-type {
                margin-left: 5px;
            }
            &.is-active {
                background-color: #fff;
                color: #2f74ff !important;
            }
        }
    }
    .contextmenu {
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        background: @--color-white;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        z-index: 3000;
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                color: #2f74ff;
                background: #eee;
            }
        }
    }
}
</style>