import Welcome from "./Welcome";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import MoreToCome from "./MoreToCome";

export const Levels = [
    {
        name: "Welcome",
        component: Welcome,
    },
    {
        name: "Color Switch",
        component: Level1,
    },
    {
        name: "Choices",
        component: Level2,
    },
    // {
    //     name: "Bounce",
    //     component: Level3,
    // },
    {
        name: "Work in Progress...",
        component: MoreToCome,
    },
];

export const getLevelName = (level: number) => {
    return Levels[level].name;
};

export const getLevelComponent = (level: number) => {
    return Levels[level].component;
};
