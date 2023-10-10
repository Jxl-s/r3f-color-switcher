import { Level0, Level1 } from "./Levels";
import { usePlayerStore } from "./Stores/usePlayerStore";

export function Experience() {
    const level = usePlayerStore((state) => state.level);

    return (
        <>
            {/* TODO: Level selection logic */}
            {level === 0 && <Level0 />}
            {level === 1 && <Level1 />}
        </>
    );
}
