export const findMajority = (
    placeCursor:number,
    placeCalRank: number[][],
    majority: number,
    ): {} => {
    let result: { [id: string] : number; } = {};
    for (let i=0; i<placeCalRank.length; i++) {
        if (placeCalRank[i][placeCursor] >= majority) {
            const key = placeCalRank[i][placeCursor];
            if (result[key] == undefined) {
                result[key] = 1;
            }
            else {
                result[key] = result[key] + 1;
            }
        }
        
    }
    return result;
};