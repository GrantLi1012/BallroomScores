import singleDanceResult from "../../util/singleDanceResult";
import { rule5Data, rule5Result } from "./testData";

test("simple base case", () => {
    const result = singleDanceResult("event", "Waltz", rule5Data);
    expect(result.rankings).toEqual(rule5Result);
});
