const cycle = 90 * 60 * 1000; // length of a 90min sleep cycle in ms
const fall = 15 * 60 * 1000; // time to fall asleep
const goodState = 100;
const badState = 0;
const cycleMin = 3.5;
const cycleMax = 5;
export const cycleDef = cycleMax;

// Enough sleep is measured from badState to goodState.
export function isEnoughSleep(cycles: number) {
    if (cycles <= cycleMin) return badState;
    if (cycles > cycleMax)
        return (goodState - badState) / (cycleMax - cycleMin) / 2;
    return (
        (goodState - badState) /
        ((cycleMax - cycleMin) / (cycles - cycleMin))
    );
};

export function wakeUpTime(now:number, cycles:number) {
   return now + cycles * cycle + fall;
}
