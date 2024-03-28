import { defaultDraftWidth, defaultShafts, defaultWarpColor } from '@/app/resources/constants/weaveDefaults'

import { createGrid } from '../utils'


export function readWarp(warp: ShaftDescription, width: number) {
    let height = warp.count || defaultShafts
    let warpGrid: grid = createGrid(width, height)

    if (warp.pattern == null || !(warp.pattern.length > 0)) {
        return warpGrid
    }

    let colors = warp.colors

    warp.pattern.forEach((thread, index) => {
        let currentColor = defaultWarpColor
        if (colors) {
            currentColor = colors[0].color
            colors[0].threads--
            if (colors[0].threads = 0) {
                colors.shift()
            }
        }
        warpGrid[thread][index] = currentColor

    })

    //Adjust the filled in part of the draft to the right (towards the tieup grid) if needed
    let lastIndex = warpGrid[0].length - 1

    for (let i = lastIndex; i >= 0; i--) {
        console.log()
        let column: color[] = []
        warpGrid.forEach(row => {
            column.push(row[lastIndex])
        })

        if (column.find(element => element != '')) {
            return warpGrid
        } else {
            warpGrid.forEach(row => {
                row.unshift(row.pop() as color)
            })
        }
    }

    return warpGrid

}
