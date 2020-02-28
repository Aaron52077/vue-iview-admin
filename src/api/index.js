import { fetch } from '@/utils/fetch'

// seamles
export function getSeamlesData() {
    let res = fetch('/comp/seamles')
    return res
}

// tree1
export function getTreeSelectData() {
    let res = fetch('/comp/tree')
    return res
}

// tree2
export function getTreeCustomData() {
    let res = fetch('/custom/tree')
    return res
}

// drag
export function getDragListData() {
    let res = fetch('/comp/list')
    return res
}

// table
export function mockTable() {
    let res = fetch('/table')
    return res
}

// editor
export function getEditortData() {
    let res = fetch('/editor')
    return res
}

/**
 * 上传excel模版
 * @param file
 * @returns {*}
 */
export function uploadFile(file) {
    let res = fetch('/biz/graduate/importExcel', 'post', file)
    return res
}