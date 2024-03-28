import { defaultColor } from '@/app/resources/constants/weaveDefaults'

export function readTieup(tieupGrid: grid, pattern: [number[]]) {

    if (pattern == null || !(pattern.flat().length > 0)) {
        return tieupGrid
    }

    pattern.forEach((row, index) => {
        row.forEach(cell => {

            tieupGrid[index][cell] = defaultColor
        })
    })

    return tieupGrid
}