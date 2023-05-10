export const findMajorityIndex = (
    placeCursor:number,
    placeCalRank: number[][],
    majority: number,
    ): {} => {
    let result: { [id: number] : number; } = {};
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
    console.log("findMajorityIndex result: ");
    console.log(result);
    return result;
};