import Dance from "../../type/Dance";
import CompetitorScores from "../../type/CompetitorScores";
import SingleDanceResult from "../../type/SingleDanceResult";
import Place from "../../type/Place";
import { findMajority } from "./findMajority";

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
    let colCursor = 0;
    for (let rank=1; rank<numCompetitors+1; rank++) {
        console.log("deciding rank " + rank + ", cursor col " + colCursor);
        // console.log("cursor col " + colCursor);
        const majorityCount : { [id: string] : number; } = findMajority(colCursor, placeCalRank, majority);
        const majorityCountKeys: string[] = Object.keys(majorityCount);
        const majorityCountSize: number = majorityCountKeys.length;
        // console.log(majorityCount);
        if (majorityCountSize == 1) {
            if (majorityCount[majorityCountKeys[0]] == 1) {
                // grant winner according to rule 5
                for (let competitor=0; competitor<numCompetitors; competitor++) {
                    if (placeCalRank[competitor][colCursor] == parseInt(majorityCountKeys[0])) {
                        rankings[competitor].placing = rank;
                        colCursor = colCursor + 1;
                        placeCalRank[competitor].fill(0, colCursor, numCompetitors);
                        break;
                    }
                }
            }
            else {
                // tie breaking using rule 7a

            }
        }
        else if (majorityCountSize > 1) {
            const sortedKeys = majorityCountKeys.sort((a, b) => {
                return parseInt(b) - parseInt(a);
            });
            console.log("sorted keys: " + sortedKeys);
            if (majorityCount[sortedKeys[0]] > 1) {
                // tie breaking using rule 7a
            }
            else {
                let placeAssigned = [false, false]
                for (let competitor=0; competitor<numCompetitors; competitor++) {
                    if (placeCalRank[competitor][colCursor] == parseInt(sortedKeys[0])) {
                        console.log("assigning rank " + (rank) + " to " + competitor)
                        rankings[competitor].placing = rank;
                        placeCalRank[competitor].fill(0, colCursor + 1, numCompetitors);
                        placeAssigned[0] = true;
                    }
                    else if (placeCalRank[competitor][colCursor] == parseInt(sortedKeys[1])) {
                        if (majorityCount[sortedKeys[1]] > 1) {
                            // tie breaking using rule 7a
                            console.log("fuck")
                        }
                        else {
                            console.log("assigning rank " + (rank+1) + " to " + competitor)
                            rankings[competitor].placing = rank + 1;
                            placeCalRank[competitor].fill(0, colCursor + 1, numCompetitors);
                            placeAssigned[1] = true;
                        }
                    }
                    if (placeAssigned[0] && placeAssigned[1]) {
                        colCursor = colCursor + 1;
                        rank = rank + 1;
                        break;
                    }
                }
            }
        }
        else if (majorityCountSize == 0) {
            // no majority, apply rule 8
        }
        else {
            console.log("[ERROR] nagative majorityIndexSize: " + majorityCountSize);
        }
        // for (let competitor=0; competitor<numCompetitors; competitor++) {
        //     if (placeCalRank[competitor][rank-1] >= majority) {
        //         rankings[competitor].placing = rank;
        //         placeCalRank[competitor].fill(0, rank, numCompetitors);
        //         //console.log(placeCalRank);
        //     }
        // }
        console.log(rankings);
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