const defaultShafts= 8
const defaultTreadles=6
const defaultDraftHeight=50
const defaultDraftWidth=30
const defaultColor='#000000'
const defaultWeftColor='#0313fc'
const defaultWarpColor='#878787'

const loomTypes:LoomType[]=['Countermarch', 'Counterbalance', 'Jack loom', 'Rigid heddle','Draw loom']
const loomMakers:string[]=['Glimåkra', 'Schacht']

const templateLoom: Loom = {
    id: undefined,
    shafts: defaultShafts,
    treadles: defaultTreadles,
    brand: loomMakers[0],
    type: loomTypes[0]
}

export {defaultColor,defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTreadles, defaultWarpColor, defaultWeftColor, loomTypes, templateLoom}

