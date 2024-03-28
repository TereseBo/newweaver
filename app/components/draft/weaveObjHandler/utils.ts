export function getHighest(sequence: number[]) {
    let number = null
    if (sequence.length > 0) {
        number = Math.max(...sequence)+1;
    }
    return number
}

export function createGrid(width:number, height:number){

    return JSON.parse(JSON.stringify(new Array(height).fill(new Array(width).fill('', 0))))

}