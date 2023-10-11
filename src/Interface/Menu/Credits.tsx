export function Credits() {
    return (
        <>
            <div className="text-white font-semibold text-xl">Credits</div>
            <ul className="flex flex-col gap-2 mt-1">
                <li className="text-white/50">
                    This project was made by{" "}
                    <a
                        className="text-blue-400 hover:text-blue-300 font-bold duration-100"
                        target="_blank"
                        href="github.com/Jxl-s"
                    >
                        @Jxl-s
                    </a>
                    , and the source code can be found{" "}
                    <a
                        className="text-blue-400 hover:text-blue-300 font-bold duration-100"
                        target="_blank"
                        href="https://github.com/Jxl-s/r3f-color-switcher"
                    >
                        here
                    </a>
                </li>
            </ul>
        </>
    );
}
