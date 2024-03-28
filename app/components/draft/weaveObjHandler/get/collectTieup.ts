export function collectTieup(tieupGrid: grid| undefined) {
    
    let pattern: number[][] = []
    
    if(!tieupGrid){
        return pattern
    }

    tieupGrid.forEach(row => {
        let patternRow: number[] = []
        row.forEach((cell, index) => {

            if (cell != '') {
                patternRow.push(index)
            }
        })
        pattern.push(patternRow)
    })
    return pattern
}