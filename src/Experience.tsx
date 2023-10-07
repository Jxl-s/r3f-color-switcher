import { Level1 } from "./Levels/Level1";

export function Experience() {
    return (
        <>
            <directionalLight />
            <ambientLight />
            <axesHelper args={[10, 10, 10]} />
            <Level1 />
        </>
    );
}
