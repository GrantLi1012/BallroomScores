import Dance from "../type/Dance";
import CompetitorScores from "../type/CompetitorScores";
import SingleDanceResult from "../type/SingleDanceResult";
import Ranking from "../type/Rank";

const singleDanceResult = (event: string, dance: Dance, competitorScores: CompetitorScores[]) : SingleDanceResult => {
    // This assumes ScoreSheet is inputted correctly, where the scores from each judge is entered in exact same order
    const numCompetitors = competitorScores.length;
    const majority = Math.floor(numCompetitors / 2) + 1;
    let sumScores: number[] = [];
    let rawScore: number[][] = [];
    let rankings: Ranking[] = [];
    let rankCount: number[][] = [];

    // set up initial tables
    competitorScores.map((competitorScore) => {
        rawScore.push(competitorScore.scores);
        sumScores.push(competitorScore.scores.reduce((a, b) => a + b, 0));
        rankings.push({
            competitorId: competitorScore.competitorId,
            rank: 0
        });
    });
    for (let i=0; i<numCompetitors; i++) {
        let tmp = [];
        for (let j=0; j<numCompetitors; j++) {
            tmp.push(0);
        }
        rankCount.push(tmp);
    };
    console.log("step 1 -----------------");
    console.log(rawScore);
    console.log(rankings);
    console.log(rankCount);
    console.log(sumScores);

    // populate rank count
    competitorScores.map((competitorScore, competitorIndex) => {
        let current_count = 0;
        for (let score=1; score<numCompetitors+1; score++) {
            for (let i=0; i<competitorScore.scores.length; i++) {
                if (competitorScore.scores[i] === score) {
                    current_count++;
                }
            }
            rankCount[competitorIndex][score-1] = current_count;
        }
    });

    console.log("step 2 -----------------");
    console.log(rankCount);

    // populate rankings
    // rule 5: if a competitor has absolute majority of the current rank, they are the winner of that rank
    // rule 6: if more than 1 competitor has majority of the current rank, the one with largest majority is the winner of that rank,
    //         and the next largest majority is awarded the following rank
    // rule 7: if more than 1 competitor has equal majority of the same rank
    //         rule 7a: add up the marks from judges that forms the majority, higher receives current rank and lower receives following rank
    //         rule 7b: if aggregated makrs are equal, recursivesly compare next rank until majority is formed
    for (let rank=1; rank<numCompetitors+1; rank++) {
        console.log("deciding rank " + rank);
        for (let competitor=0; competitor<numCompetitors; competitor++) {
            if (rankCount[competitor][rank-1] >= majority) {
                rankings[competitor].rank = rank;
                rankCount[competitor].fill(0, rank, numCompetitors);
                console.log(rankCount);
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
        rankCount
    };
};

export default singleDanceResult;