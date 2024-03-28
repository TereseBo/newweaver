import { getHighest } from '../utils'

export function collectWarp(warp: grid | undefined) {

    if (!warp) {
        let shafts: ShaftDescription = {
            count: null,
            pattern: [],
            pattern_repeat: null,
            colors: []
        }
        return shafts
    }

    let colorPatternTracker = 0;
    let pattern: number[] = [];
    let colors: ColorDescription[] = [];
    let previousColor: color | undefined = undefined;

    let shaft = null;

    //Loop grid and translate to weaveObject
    //Loop every warp column and isolate it for extraction of shaft number and color
    for (let i = 0; i < warp[0].length; i++) {
        let currentColumn = []

        for (let j = 0; j < warp.length; j++) {
            currentColumn.push(warp[j][i])
        }
        let newColor = undefined
        currentColumn.forEach((cell, index) => {
            if (cell != '') {
                newColor = cell
                shaft = index
                pattern.push(shaft);

                if (newColor === previousColor) {

                    colorPatternTracker++;
                    previousColor = newColor;

                } else {
                    colorPatternTracker++;
                    colors.push({ color: previousColor || '', threads: colorPatternTracker });
                    colorPatternTracker = 0;
                    previousColor = newColor;
                }
            }
        })
    }

    colors.push({ color: previousColor || '', threads: colorPatternTracker + 1 });
    colors.shift()
    let shafts: ShaftDescription = {
        count: getHighest(pattern),
        pattern: pattern,
        pattern_repeat: null,
        colors: colors
    }
    return shafts
}