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