import singleDanceResult from "../util/singleDanceResult";
import CompetitorScores from "../type/CompetitorScores";

// simple case
// Waltz: https://results.o2cm.com/scoresheet3.asp?event=fdf23a&heatid=40423010&bclr=#FFFFFF&tclr=#000000
const scores1: CompetitorScores[] = [
    {
        competitorId: "1",
        scores: [1, 1, 2]
    },
    {
        competitorId: "2",
        scores: [2, 2, 1]
    }
];

const ranking1 = [
    {
        competitorId: "1",
        rank: 1
    },
    {
        competitorId: "2",
        rank: 2
    }
]

// medium case without ties
// Quickstep: https://results.o2cm.com/scoresheet3.asp?event=ccc23&heatid=40423810&bclr=#FFFFFF&tclr=#000000
const scores2: CompetitorScores[] = [
    {
        competitorId: "1",
        scores: [1,2,3,1,1]
    },
    {
        competitorId: "2",
        scores: [2,3,2,2,2]
    },
    {
        competitorId: "3",
        scores: [3,1,1,3,3]
    },
    {
        competitorId: "4",
        scores: [4,4,4,4,4]
    }
];

const ranking2 = [
    {
        competitorId: "1",
        rank: 1
    },
    {
        competitorId: "2",
        rank: 2
    },
    {
        competitorId: "3",
        rank: 3
    },
    {
        competitorId: "4",
        rank: 4
    }
];

// medium case with ties
// Foxtrot: https://results.o2cm.com/scoresheet3.asp?event=ccc23&heatid=40423810&bclr=#FFFFFF&tclr=#000000
const scores3: CompetitorScores[] = [
    {
        competitorId: "1",
        scores: [2,1,2,2,1]
    },
    {
        competitorId: "2",
        scores: [4,4,3,3,4]
    },
    {
        competitorId: "3",
        scores: [3,2,1,4,3]
    },
    {
        competitorId: "4",
        scores: [1,3,4,1,2] 
    }
];

const ranking3 = [
    {
        competitorId: "1",
        rank: 1
    },
    {
        competitorId: "4",
        rank: 2
    },
    {
        competitorId: "3",
        rank: 3
    },
    {
        competitorId: "2",
        rank: 4
    }
];

// test("simple base case", () => {
//     const result = singleDanceResult("event", "Waltz", scores1);
//     expect(result.rankings).toEqual(ranking1);
// });

// test("medium case without ties", () => {
//     const result = singleDanceResult("event", "Quickstep", scores2);
//     expect(result.rankings).toEqual(ranking2);
// });

test("medium case with ties", () => {
    const result = singleDanceResult("event", "Foxtrot", scores3);
    expect(result.rankings).toEqual(ranking3);
});
