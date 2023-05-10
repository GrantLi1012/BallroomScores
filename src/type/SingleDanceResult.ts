import Dance from "./Dance";
import Place from "./Place";

type SingleDanceResult = {
    event: string; // e.g. "Adult Open Standard"
    dance: Dance;
    rankings: Place[];
    rawScore: number[][]; // tables generated by; rules similar to o2cm results
    placeCalRank: number[][];
    placeCalAggregate: number[][];
}

export default SingleDanceResult;