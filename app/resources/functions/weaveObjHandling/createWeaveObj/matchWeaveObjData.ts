export function matchWeaveObjData(weaveObj: WeaveObject) {
    //Check shaft count and tieup height
    const { shafts, tieup, treadling, threads } = weaveObj
    console.log('entering match')
    console.log(shafts.count)

    const flatTieUp = tieup.reduce((prev, currentVal) => {
        return prev.concat(currentVal)
    }, [])

    const highestTie = Math.max(...flatTieUp)

    //If count values are null but tieUp specified it's used to define required treadles/shafts
    shafts.count = shafts.count || tieup.length
    treadling.count = treadling.count || highestTie

    //If count values are defined but lower than the tie-up they are bumped to match this value   
    if (shafts.count < tieup.length) shafts.count = tieup.length
    if (treadling.count < highestTie) shafts.count = highestTie
    console.log('leaving match')
    console.log(shafts.count)
    return {
        shafts,
        treadling,
        tieup,
        threads
    }
}
