import singleDanceResult from "../../util/singleDance/singleDanceResult";
import { rule5Data1, rule5Result1, rule5Data2, rule5Result2, rule6Data1, rule6Result1 } from "./testData";

test("rule 5 test 1", () => {
    const result = singleDanceResult("event", "Waltz", rule5Data1);
    expect(result.rankings).toEqual(rule5Result1);
});

test("rule 5 test 2", () => {
    const result = singleDanceResult("event", "Cha Cha", rule5Data2);
    expect(result.rankings).toEqual(rule5Result2);
});

// test("rule 6 test 1", () => {
//     const result = singleDanceResult("event", "Foxtrot", rule6Data1);
//     expect(result.rankings).toEqual(rule6Result1);
// });
