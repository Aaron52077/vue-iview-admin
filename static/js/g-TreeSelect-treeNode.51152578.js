(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["g-TreeSelect-treeNode"],{2507:function(t,o,e){"use strict";function n(t,o,e){this.$children.forEach(a=>{const c=a.$options.name;c===t?a.$emit.apply(a,[o].concat(e)):n.apply(a,[t,o].concat([e]))})}o["a"]={methods:{dispatch(t,o,e){let n=this.$parent||this.$root,a=n.$options.name;while(n&&(!a||a!==t))n=n.$parent,n&&(a=n.$options.name);n&&n.$emit.apply(n,[o].concat(e))},broadcast(t,o,e){n.call(this,t,o,e)}}}}}]);