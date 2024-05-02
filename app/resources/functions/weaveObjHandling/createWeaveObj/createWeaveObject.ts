
import { collectTieup } from './collectTieup'
import { collectWarp } from './collectWarp'
import { collectWeft } from './collectWeft'
import { matchWeaveObjData } from './matchWeaveObjData'

export function createWeaveObject(warpGrid: grid | undefined, weftGrid: grid | undefined, tieupGrid: grid| undefined)
:WeaveObject {
    const shafts = collectWarp(warpGrid)
    const treadling = collectWeft(weftGrid)
    const tieup = collectTieup(tieupGrid)
    console.log(tieup)
console.log(shafts.count)
    const weave = matchWeaveObjData({
        shafts:{...shafts},
        treadling: {... treadling},
        tieup:[...tieup],
        threads: null
    })
    console.log(shafts.count)
    return weave

}