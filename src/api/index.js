import { fetch } from '@/utils/fetch'

// tree
export function getTreeSelectData() {
    let res = fetch('/comp/tree')
    return res
}

// drag
export function getDragListData() {
    let res = fetch('/comp/list')
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