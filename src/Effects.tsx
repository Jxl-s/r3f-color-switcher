import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
    return (
        <>
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.3}
                    luminanceSmoothing={0.9}
                    height={300}
                />
            </EffectComposer>
        </>
    );
}
