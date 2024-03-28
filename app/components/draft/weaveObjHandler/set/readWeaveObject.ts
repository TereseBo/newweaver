import { defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTreadles } from '@/app/resources/constants/weaveDefaults'
import { resizeGrid } from '@/app/resources/functions/resizeGrid'

import { createGrid } from '../utils'
import { readTieup } from './readTieup'
import { readWarp } from './readWarp'
import { readWeft } from './readWeft'

export function readWeaveObject(weaveObject: WeaveObject) {
    let shafts = weaveObject.shafts.count || defaultShafts
    let treadles = weaveObject.treadling.count || defaultTreadles
    let width = Math.max(weaveObject.shafts.pattern.length, defaultDraftWidth)
    let height = Math.max(weaveObject.treadling.pattern.length, defaultDraftHeight)

    let tieupGrid: grid = createGrid(treadles, shafts)
    tieupGrid = readTieup(tieupGrid, weaveObject.tieup)
    let treadleGrid: grid = readWeft(weaveObject.treadling, height)
    let warpGrid: grid = readWarp(weaveObject.shafts, width)


    return { warpGrid, tieupGrid, treadleGrid }

}
