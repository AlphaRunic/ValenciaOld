import { KnitServer as Knit } from "@rbxts/knit";
import { GameStats } from "../../shared/structs";
import { $print } from "rbxts-transform-debug";
import { RunService } from "@rbxts/services";

declare global {
    interface KnitServices {
        GameService: typeof GameService;
    }
}

const data = Knit.GetService("DataManager");
const GameService = Knit.CreateService({
    Name: "GameService",

    Client: {
        Initiate(plr: Player) {
            this.Server.Initiate(plr);
        }
    },

    Initiate(plr: Player) {
        $print("GameService active");
        const defaultData = new Map<string, unknown>([
            ["gold", 500],
            ["gems", 0],
            ["questNumber", 1],
            ["gameStats", new GameStats]
        ]);
        const testData = new Map<string, unknown>([
            ["TEST_gold", 500],
            ["TEST_gems", 0],
            ["TEST_questNumber", 1],
            ["TEST_gameStats", new GameStats]
        ]);

        if (RunService.IsStudio())
            testData.forEach((v, k) => data.Store<typeof v>(plr, k, v));
        else
            defaultData.forEach((v, k) => data.Store<typeof v>(plr, k, v));
    }
});

export = GameService;