import { defaultDraftHeight, defaultTreadles, defaultWeftColor } from '@/app/resources/constants/weaveDefaults'

import { createGrid, getHighest } from '../utils'


export function readWeft(weft: TreadlingDescription, height: number) {

    let width = weft.count || defaultTreadles
    let weftGrid: grid = createGrid(width, height)

    if (weft.pattern == null || !(weft.pattern.length > 0)) {
        return weftGrid
    }

    let colors = weft.colors

    weft.pattern.forEach((treadle, index) => {
        let currentColor = defaultWeftColor
        if (colors) {
            currentColor = colors[0].color
            colors[0].threads--
            if (colors[0].threads = 0) {
                colors.shift()
            }
        }
        weftGrid[index][treadle] = currentColor
    })

    //Adjust the filled in treadling to the bottom (where tie-up is) if needed
    let lastIndex = weftGrid.length - 1

    for (let i = lastIndex; i >= 0; i--) {

        if (weftGrid[lastIndex].find(element => element != '')) {
            return weftGrid
        } else {
            weftGrid.unshift(weftGrid.pop() as color[])
        }
    }

    return weftGrid

}
