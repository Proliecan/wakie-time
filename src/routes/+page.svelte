<script lang="ts">
    import { onMount } from "svelte";

    let now = $state(Date.now());
    setInterval(() => {
        now = Date.now();
    }, 1000); // keep the result clock running

    let result = $state(0);
    let cycles = $state(0);
    let duration = $derived(result - now);

    const cycle = 90 * 60 * 1000; // length of a 90min sleep cycle in ms
    const fall = 15 * 60 * 1000; // time to fall asleep
    const goodState = 100;
    const badState = 0;
    const cycleMin = 3.5;
    const cycleMax = 5;

    let enough = $derived.by(() => {
        if (cycles <= cycleMin) return badState;
        if (cycles > cycleMax)
            return (goodState - badState) / (cycleMax - cycleMin) / 2;
        return (
            (goodState - badState) /
            ((cycleMax - cycleMin) / (cycles - cycleMin))
        );
    });

    $effect(() => {
        result = now + cycles * cycle + fall;
    });

    let addCycle = () => {
        cycles++;
    };
    let redCycle = () => {
        cycles = cycles > 1 ? cycles - 1 : 0;
    };

    onMount(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key == "ArrowUp" || event.key == "ArrowRight") {
                addCycle();
                return;
            }
            if (event.key == "ArrowDown" || event.key == "ArrowLeft") {
                redCycle();
                return;
            }
        });
    });
</script>

<h1>⏰💤 Wakie-time Calculator</h1>

<div class="cycles">
    <button onclick={redCycle} class="cycles">-</button>
    <span class="center">
        <span class="cycles">
            <span class="num" style="--enough: {enough};">{cycles}</span>
            Cycles
        </span>
        <span class="duration">
            <span class="num">
                {Math.round(duration / (1000 * 60 * 60))}
            </span>
            Hours
            <span class="num">
                {(Math.floor((duration / (1000 * 60 * 60)) * 100) / 100 -
                    Math.floor(duration / (1000 * 60 * 60))) *
                    60}
            </span>
            Minutes
        </span>
        <span class="result">
            <span class="num">
                {new Date(result).toLocaleTimeString([], {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    // second: "2-digit",
                    // timeZoneName: "shortGeneric",
                })}
            </span>

            {new Date(result).toLocaleString([], {
                timeZoneName: "shortGeneric",
            }).split("M ")[1]}
        </span>
    </span>
    <button onclick={addCycle} class="cycles">+</button>
</div>
