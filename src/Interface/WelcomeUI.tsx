export function WelcomeUI() {
    return (
        <>
            <h1 className="absolute top-40 w-full text-center text-white text-6xl font-bold bg-black/50 py-4">
                <span className="game-title">Color Switcher</span>
                <p className="text-lg font-normal text-white/75 mt-1">
                    Use colors to get through levels
                </p>
            </h1>
            <h1 className="absolute bottom-0 w-full text-center text-white/50 text-xl bg-black/50 py-4">
                This project's source can be found on my{" "}
                <a
                    href="https://github.com/Jxl-s/r3f-color-switcher"
                    className="text-blue-400 font-bold hover:text-blue-300 duration-100"
                    target="_blank"
                >
                    GitHub
                </a>
            </h1>
        </>
    );
}
