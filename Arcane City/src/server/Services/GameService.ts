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
        Initiate(plr: Player): void {
            this.Server.Initiate(plr);
        }
    },

    Initiate(plr: Player): void {
        $print("GameService active");
        const defaultData = new Map<string, unknown>([
            ["gold", 500],
            ["crystals", 0],
            ["questNumber", 1],
            ["gameStats", new GameStats]
        ]);
        const testData = new Map<string, unknown>([
            ["TEST_gold", 2000],
            ["TEST_crystals", 999999],
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