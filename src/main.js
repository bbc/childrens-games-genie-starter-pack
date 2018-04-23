import { Home } from "../node_modules/genie/src/components/home.js";
import { Loadscreen } from "../node_modules/genie/src/components/loadscreen.js";
import { Select } from "../node_modules/genie/src/components/select.js";
import { ClickProgressionGame } from "./components/click-progression-game.js";
import { Results } from "../node_modules/genie/src/components/results.js";
import { startup } from "../node_modules/genie/src/core/startup.js";

const transitions = [
    {
        name: "loadscreen",
        state: new Loadscreen(),
        nextScreenName: () => "home",
    },
    {
        name: "home",
        state: new Home(),
        nextScreenName: () => "game-button-select",
    },
    {
        name: "game-button-select",
        state: new Select(),
        nextScreenName: state => {
            if (state.transient.home) {
                state.transient.home = false;
                return "home";
            }
            if (state.transient.restart) {
                state.transient.restart = false;
                return "home";
            }
            return "game";
        },
    },
    {
        name: "game",
        state: new ClickProgressionGame(),
        nextScreenName: state => {
            if (state.transient.home) {
                state.transient.home = false;
                return "home";
            }
            if (state.transient.restart) {
                state.transient.restart = false;
                return "game";
            }
            return "results";
        },
    },
    {
        name: "results",
        state: new Results(),
        nextScreenName: state => {
            if (state.transient.game) {
                state.transient.game = false;
                return "game";
            }
            if (state.transient.home) {
                state.transient.home = false;
                return "home";
            }
            if (state.transient.restart) {
                state.transient.restart = false;
                return "game";
            }
            return "home";
        },
    },
];

startup(transitions);
