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
    const goodState = "🟢";
    const badState = "🔴";
    const cycleMin = 4;
    const cycleMax = 6;

    let enough = $derived(
        cycles >= cycleMin && cycles <= cycleMax ? goodState : badState,
    );

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

<button onclick={addCycle} class="cycles">+</button>
<div class="cycles">{cycles} Cycles</div>
<button onclick={redCycle} class="cycles">-</button>

<div class="duration">
    {Math.round((duration / (1000 * 60 * 60)) * 100) / 100}h
</div>
<div class="enough">{enough}</div>
<div class="result">
    {new Date(result).toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        timeZoneName: "shortGeneric",
    })}
</div>
