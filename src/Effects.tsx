import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
    return (
        <>
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.5}
                    luminanceSmoothing={2}
                    height={300}
                />
            </EffectComposer>
        </>
    );
}
