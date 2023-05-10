import Dance from "../type/Dance";
import CompetitorScores from "../type/CompetitorScores";
import SingleDanceResult from "../type/SingleDanceResult";
import Place from "../type/Place";

const singleDanceResult = (event: string, dance: Dance, competitorScores: CompetitorScores[]) : SingleDanceResult => {
    // This assumes ScoreSheet is inputted correctly, where the scores from each judge is entered in exact same order
    const numCompetitors = competitorScores.length;
    const numAdjudicators = competitorScores[0].scores.length;
    const majority = Math.floor(numAdjudicators / 2) + 1;

    let rankings: Place[] = [];                   // numCompetitors x 1: final rankings
    let rawScore: number[][] = [];                  // numCompetitors x numAdjudicators: scores from adjudicator
    let placeCalRank: number[][] = [];              // numCompetitors x numCompetitors: for rule 5, 6, 7a
    let placeCalAggregate: number[][] = [];         // numCompetitors x numCompetitors: for rule 7b

    // initialize table contents
    console.log("step 1 -----------------");
    competitorScores.map((competitorScore) => {
        rawScore.push(competitorScore.scores);
        rankings.push({
            competitorId: competitorScore.competitorId,
            placing: 0
        });
    });
    for (let i=0; i<numCompetitors; i++) {
        let tmp = [];
        for (let j=0; j<numCompetitors; j++) {
            tmp.push(0);
        }
        placeCalRank.push(tmp);
        placeCalAggregate.push(tmp);
    };
    
    // console.log(rawScore);
    // console.log(rankings);
    // console.log(placeCalRank);

    // populate rank count
    console.log("step 2 -----------------");
    competitorScores.map((competitorScore, competitorIndex) => {
        const scores = competitorScore.scores;
        let placingDict = [];  // having 3 in first element means received place 1 from 3 judges
        for (let i=0; i<numCompetitors; i++) {
            placingDict.push(0);
        }
        for (let i=0; i<numAdjudicators; i++) {
            placingDict[scores[i]-1] += 1;
        }
        let placingSum: number[] = [];
        let placingAggregate: number[] = [];
        for (let i = 0; i < placingDict.length; i++) {
            if (i==0) {
                placingSum.push(placingDict[i]);
                placingAggregate.push(placingDict[i] * (i+1));
            }
            else {
                placingSum.push(placingSum[i-1] + placingDict[i]);
                placingAggregate.push(placingAggregate[i-1] + placingDict[i] * (i+1));
            }
        }
        placeCalRank[competitorIndex] = placingSum;
        placeCalAggregate[competitorIndex] = placingAggregate;
    });
    console.log(placeCalRank);
    console.log(placeCalAggregate);

    // populate rankings
    // rule 5: if a competitor has absolute majority of the current rank, they are the winner of that rank
    // rule 6: if more than 1 competitor has majority of the current rank, the one with largest majority is the winner of that rank,
    //         and the next largest majority is awarded the following rank
    // rule 7: if more than 1 competitor has equal majority of the same rank
    //         rule 7a: add up the marks from judges that forms the majority, higher receives current rank and lower receives following rank
    //         rule 7b: if aggregated makrs are equal, recursivesly compare next rank until majority is formed
    for (let rank=1; rank<numCompetitors+1; rank++) {
        //console.log("deciding rank " + rank);
        for (let competitor=0; competitor<numCompetitors; competitor++) {
            if (placeCalRank[competitor][rank-1] >= majority) {
                rankings[competitor].placing = rank;
                placeCalRank[competitor].fill(0, rank, numCompetitors);
                //console.log(placeCalRank);
            }
        }
    }

    console.log("step 3 -----------------");
    console.log(rankings);

    return {
        event: event,
        dance: dance,
        rankings,
        rawScore,
        placeCalRank,
        placeCalAggregate
    };
};

export default singleDanceResult;